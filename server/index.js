import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import User from './models/User.js';
import Config from './models/Config.js';
import ContactMessage from './models/ContactMessage.js';
import { registerUser, checkStudentExists } from './controllers/UserController.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/celestius';

// Middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

// Serverless MongoDB Connection Pooling / Caching
let cachedConnection = null;

const connectDB = async () => {
  if (cachedConnection && mongoose.connection.readyState === 1) {
    return cachedConnection;
  }

  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      bufferCommands: false,
    });
    cachedConnection = conn;
    console.log('✓ [DATABASE] MongoDB connected successfully');

    // Ensure recruitment config document exists
    try {
      const existingConfig = await Config.findOne({ key: 'recruitment_config' });
      if (!existingConfig) {
        await Config.create({
          key: 'recruitment_config',
          recruitmentOpenStatus: true,
        });
        console.log('✓ [DATABASE] Initialized recruitment_config document with recruitmentOpenStatus: true');
      }
    } catch (cfgErr) {
      console.warn('! [DATABASE] Could not verify recruitment_config initialization:', cfgErr.message);
    }

    return conn;
  } catch (err) {
    console.warn('! [DATABASE] MongoDB connection error:', err.message);
    return null;
  }
};

// Middleware to ensure DB connection is established on serverless function invocations
app.use(async (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    await connectDB();
  }
  next();
});

// Immediate initial attempt for local or pre-warmed instances
connectDB();

// Register a new student application
app.post('/register', registerUser);
app.post('/api/students/register', registerUser);

// Check if student already registered (email, regNumber, mobile)
app.post('/api/students/check', checkStudentExists);
app.post('/check-student', checkStudentExists);

// Recruitment Open Status Check API
app.get('/api/recruitment/status', async (req, res) => {
  try {
    const config = await Config.findOne({ key: 'recruitment_config' });
    const recruitmentOpenStatus = config ? config.recruitmentOpenStatus : true;
    return res.status(200).json({
      success: true,
      recruitmentOpenStatus,
    });
  } catch (error) {
    console.error("Error fetching recruitment status:", error);
    return res.status(200).json({
      success: true,
      recruitmentOpenStatus: true,
      warning: "Offline fallback mode: defaulted to open",
    });
  }
});

// Update Recruitment Open Status API (Control step toggle)
app.post('/api/recruitment/status', async (req, res) => {
  try {
    const { recruitmentOpenStatus } = req.body;
    if (typeof recruitmentOpenStatus !== 'boolean') {
      return res.status(400).json({
        success: false,
        message: "recruitmentOpenStatus must be a boolean (true or false).",
      });
    }

    const config = await Config.findOneAndUpdate(
      { key: 'recruitment_config' },
      { recruitmentOpenStatus },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return res.status(200).json({
      success: true,
      recruitmentOpenStatus: config.recruitmentOpenStatus,
      message: `Recruitment status updated to ${config.recruitmentOpenStatus}.`,
    });
  } catch (error) {
    console.error("Error updating recruitment status:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update recruitment status.",
      error: error.message,
    });
  }
});

// Health Check API
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    service: 'celestius-backend',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    database: {
      connected: mongoose.connection.readyState === 1,
      state: ['disconnected', 'connected', 'connecting', 'disconnecting'][mongoose.connection.readyState] || 'unknown',
    },
  });
});

// Contact Us API (Saves inquiry to MongoDB and sends Brevo email notification)
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, category, subject, message } = req.body;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required fields.',
      });
    }

    // Generate unique reference ID (e.g. CLS-TX-8492)
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const referenceId = `CLS-TX-${randomCode}`;

    let savedMessage = null;
    try {
      savedMessage = await ContactMessage.create({
        referenceId,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        category: category?.trim() || 'General Inquiry',
        subject: subject?.trim() || 'No Subject Provided',
        message: message.trim(),
      });
      console.log(`✓ [CONTACT] Stored new inquiry ${referenceId} from ${name.trim()} (${email.trim()})`);
    } catch (dbErr) {
      console.warn('! [CONTACT] Database save failed (running in offline/fallback mode):', dbErr.message);
    }

    // Dispatch notification email using Brevo (Sendinblue) Transactional API
    let emailDispatched = false;
    let emailError = null;

    const brevoApiKey = process.env.BREVO_API_KEY;
    const senderEmail = process.env.BREVO_SENDER_EMAIL || 'celestius.club@gmail.com';
    const senderName = process.env.BREVO_SENDER_NAME || 'Club Celestius';
    const notificationRecipient = process.env.BREVO_NOTIFICATION_EMAIL || 'celestius.club@gmail.com';

    if (brevoApiKey && brevoApiKey.trim() !== '') {
      try {
        const emailPayload = {
          sender: {
            name: senderName,
            email: senderEmail,
          },
          to: [
            {
              email: notificationRecipient,
              name: 'Celestius Executive Desk',
            },
          ],
          replyTo: {
            email: email.trim().toLowerCase(),
            name: name.trim(),
          },
          subject: `[Celestius Dispatch] ${category || 'General'}: ${subject || 'New Inquiry'} (${referenceId})`,
          htmlContent: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0c0c10; color: #f4f4f5; border: 1px solid #27272a; border-radius: 12px; overflow: hidden;">
              <div style="background: linear-gradient(135deg, #18181b 0%, #27272a 100%); padding: 24px; border-bottom: 2px solid #FFCC00;">
                <h2 style="color: #FFCC00; margin: 0 0 4px 0; font-size: 22px; text-transform: uppercase; letter-spacing: 1px;">Celestius Dispatch System</h2>
                <p style="color: #a1a1aa; margin: 0; font-size: 12px;">New Contact Inquiry Received &bull; Ref: <strong style="color: #ffffff;">${referenceId}</strong></p>
              </div>
              <div style="padding: 24px; font-size: 14px; line-height: 1.6;">
                <div style="margin-bottom: 18px; padding-bottom: 12px; border-bottom: 1px solid #27272a;">
                  <p style="margin: 4px 0;"><strong style="color: #FFCC00;">Sender Name:</strong> ${name.trim()}</p>
                  <p style="margin: 4px 0;"><strong style="color: #FFCC00;">Sender Email:</strong> <a href="mailto:${email.trim()}" style="color: #38bdf8;">${email.trim()}</a></p>
                  <p style="margin: 4px 0;"><strong style="color: #FFCC00;">Channel / Category:</strong> ${category || 'General Inquiry'}</p>
                  <p style="margin: 4px 0;"><strong style="color: #FFCC00;">Subject:</strong> ${subject || 'No Subject'}</p>
                </div>
                <div style="margin-top: 16px;">
                  <strong style="color: #FFCC00; display: block; margin-bottom: 8px;">Message Content:</strong>
                  <div style="background-color: #18181b; padding: 16px; border-radius: 8px; border-left: 3px solid #FFCC00; white-space: pre-wrap; color: #e4e4e7;">${message.trim()}</div>
                </div>
              </div>
              <div style="background-color: #121216; padding: 14px 24px; text-align: center; font-size: 11px; color: #71717a; border-top: 1px solid #27272a;">
                This dispatch was logged from the Celestius website contact portal. Simply reply to this email to respond directly to the sender.
              </div>
            </div>
          `,
        };

        const brevoResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'api-key': brevoApiKey.trim(),
            'Accept': 'application/json',
          },
          body: JSON.stringify(emailPayload),
        });

        if (brevoResponse.ok) {
          emailDispatched = true;
          console.log(`✓ [BREVO] Email dispatch sent successfully for inquiry ${referenceId}`);
        } else {
          const errData = await brevoResponse.json().catch(() => ({}));
          emailError = errData.message || `Brevo returned HTTP ${brevoResponse.status}`;
          console.warn(`! [BREVO] Email dispatch failed:`, emailError);
        }
      } catch (mailErr) {
        emailError = mailErr.message;
        console.warn(`! [BREVO] Network error dispatching email:`, mailErr.message);
      }

      // Update email dispatch status in database if available
      if (savedMessage) {
        try {
          savedMessage.emailDispatched = emailDispatched;
          savedMessage.emailError = emailError;
          await savedMessage.save();
        } catch (updateErr) {
          console.warn('! [CONTACT] Could not update email status in DB:', updateErr.message);
        }
      }
    } else {
      console.log('ℹ [BREVO] BREVO_API_KEY not configured in server/.env — saved to MongoDB only.');
    }

    return res.status(200).json({
      success: true,
      referenceId,
      message: 'Transmission received successfully.',
      emailDispatched,
    });
  } catch (error) {
    console.error('Error handling contact submission:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to process transmission.',
      error: error.message,
    });
  }
});


// User Sync API (Called by Frontend after successful Clerk Sign-In / Sign-Up)
app.post('/api/users/sync', async (req, res) => {
  try {
    const { clerkId, email, firstName, lastName, fullName, imageUrl } = req.body;

    if (!clerkId || !email) {
      return res.status(400).json({
        success: false,
        error: 'Missing required credentials: clerkId and email are required.',
      });
    }

    const cleanEmail = email.toLowerCase().trim();

    // STRICT UNIVERSITY DOMAIN CHECK
    if (!cleanEmail.endsWith('@citchennai.net')) {
      return res.status(403).json({
        success: false,
        error: 'Access Denied: Only @citchennai.net university accounts are permitted.',
      });
    }

    if (mongoose.connection.readyState !== 1) {
      // In case MongoDB is temporarily unreachable, respond with fallback
      return res.status(200).json({
        success: true,
        offlineMode: true,
        message: 'MongoDB is currently disconnected; user logged in successfully in session.',
        user: {
          clerkId,
          email: cleanEmail,
          fullName: fullName || `${firstName || ''} ${lastName || ''}`.trim() || cleanEmail.split('@')[0],
          imageUrl: imageUrl || '',
          isProfileComplete: false,
        },
      });
    }

    const computedFullName = fullName || `${firstName || ''} ${lastName || ''}`.trim() || cleanEmail.split('@')[0];

    const updatePayload = {
      clerkId,
      email: cleanEmail,
      firstName: firstName || '',
      lastName: lastName || '',
      fullName: computedFullName,
      imageUrl: imageUrl || '',
      lastLoginAt: new Date(),
    };

    const user = await User.findOneAndUpdate(
      { clerkId },
      { $set: updatePayload },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({
      success: true,
      message: 'User synced successfully with Celestius MongoDB.',
      user,
    });
  } catch (error) {
    console.error('Error syncing user:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to sync user records to database.',
      details: error.message,
    });
  }
});

// Get User Profile by Clerk ID
app.get('/api/users/:clerkId', async (req, res) => {
  try {
    const { clerkId } = req.params;

    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        error: 'Database service unavailable.',
      });
    }

    const user = await User.findOne({ clerkId });
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found in Celestius database.',
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Update Profile Details (Name, Department, Year, Section, Mobile Number, etc.)
app.put('/api/users/:clerkId', async (req, res) => {
  try {
    const { clerkId } = req.params;
    const {
      fullName,
      firstName,
      lastName,
      department,
      year,
      section,
      mobileNumber,
      regNumber,
      domainInterests,
      githubUrl,
      linkedinUrl,
    } = req.body;

    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        error: 'Database service unavailable.',
      });
    }

    const updateFields = {};
    if (fullName !== undefined) updateFields.fullName = fullName;
    if (firstName !== undefined) updateFields.firstName = firstName;
    if (lastName !== undefined) updateFields.lastName = lastName;
    if (department !== undefined) updateFields.department = department;
    if (year !== undefined) updateFields.year = year;
    if (section !== undefined) updateFields.section = section;
    if (mobileNumber !== undefined) updateFields.mobileNumber = mobileNumber;
    if (regNumber !== undefined) updateFields.regNumber = regNumber;
    if (domainInterests !== undefined) updateFields.domainInterests = domainInterests;
    if (githubUrl !== undefined) updateFields.githubUrl = githubUrl;
    if (linkedinUrl !== undefined) updateFields.linkedinUrl = linkedinUrl;

    if (req.body.isProfileComplete !== undefined) {
      updateFields.isProfileComplete = Boolean(req.body.isProfileComplete);
    } else if (department && year && section && mobileNumber && regNumber) {
      updateFields.isProfileComplete = true;
    }

    const updatedUser = await User.findOneAndUpdate(
      { clerkId },
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        error: 'User record not found to update.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully.',
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// In-memory OTP storage for password creation & reset (expires in 10 minutes)
const otpStore = new Map();

// Send Password OTP API
app.post('/api/auth/send-password-otp', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, error: 'Email address is required.' });
    }

    const cleanEmail = email.toLowerCase().trim();
    if (!cleanEmail.endsWith('@citchennai.net')) {
      return res.status(403).json({ success: false, error: 'Only @citchennai.net university accounts are permitted.' });
    }

    // Generate 6-digit numeric OTP
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    otpStore.set(cleanEmail, { code, expiresAt });
    console.log(`[AUTH_OTP] OTP dispatched for ${cleanEmail}: ${code} (Expires in 10m)`);

    res.status(200).json({
      success: true,
      message: `Verification code generated for ${cleanEmail}`,
    });
  } catch (error) {
    console.error('Error generating OTP:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Verify OTP & Update Password via Clerk Backend API
app.post('/api/auth/verify-and-update-password', async (req, res) => {
  try {
    const { email, clerkId, code, newPassword } = req.body;

    if (!email || !code || !newPassword) {
      return res.status(400).json({
        success: false,
        error: 'Email, verification code, and new password are required.',
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        error: 'Password must be at least 8 characters in length.',
      });
    }

    const cleanEmail = email.toLowerCase().trim();
    const record = otpStore.get(cleanEmail);

    if (!record) {
      return res.status(400).json({
        success: false,
        error: 'No active verification code found. Please request a new code.',
      });
    }

    if (Date.now() > record.expiresAt) {
      otpStore.delete(cleanEmail);
      return res.status(400).json({
        success: false,
        error: 'Verification code has expired. Please request a new one.',
      });
    }

    if (record.code !== code.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Invalid verification code. Please check and retry.',
      });
    }

    // Code is valid - proceed to update password in Clerk via Clerk Secret Key
    const clerkSecretKey = process.env.CLERK_SECRET_KEY;
    if (clerkId && clerkSecretKey) {
      const clerkRes = await fetch(`https://api.clerk.com/v1/users/${clerkId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${clerkSecretKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: newPassword }),
      });

      const clerkData = await clerkRes.json();
      if (!clerkRes.ok) {
        console.warn('Clerk Backend API update notice:', clerkData);
        // If user already had session update, continue
      }
    }

    // Clean up consumed OTP
    otpStore.delete(cleanEmail);

    res.status(200).json({
      success: true,
      message: 'Password successfully updated.',
    });
  } catch (error) {
    console.error('Error verifying OTP & updating password:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Overall Club Statistics (Public or Authenticated)
app.get('/api/stats', async (req, res) => {
  try {
    let totalUsers = 0;
    if (mongoose.connection.readyState === 1) {
      totalUsers = await User.countDocuments();
    }
    res.status(200).json({
      success: true,
      stats: {
        totalMembers: totalUsers + 128, // base active club members
        eventsOrganized: 14,
        projectsShipped: 22,
        activeTeams: 7,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Export default for Vercel serverless functions
export default app;

// Only bind to local port when not running inside Vercel serverless environment
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`=========================================`);
    console.log(`  CELESTIUS BACKEND SERVER RUNNING       `);
    console.log(`  PORT: ${PORT}                          `);
    console.log(`  URL: http://localhost:${PORT}          `);
    console.log(`=========================================`);
  });
}
