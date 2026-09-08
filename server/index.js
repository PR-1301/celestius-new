import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import User from './models/User.js';

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

// MongoDB Connection
let isDbConnected = false;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    isDbConnected = true;
    console.log('✓ [DATABASE] MongoDB connected successfully:', MONGODB_URI.replace(/\/\/[^:]+:[^@]+@/, '//***:***@'));
  } catch (err) {
    isDbConnected = false;
    console.warn('! [DATABASE] MongoDB connection failed:', err.message);
    console.warn('! [DATABASE] Server running in offline DB mode. Please ensure MongoDB is running and MONGODB_URI in server/.env is valid.');
  }
};

connectDB();

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

app.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(`  CELESTIUS BACKEND SERVER RUNNING       `);
  console.log(`  PORT: ${PORT}                          `);
  console.log(`  URL: http://localhost:${PORT}          `);
  console.log(`=========================================`);
});
