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

    if (mongoose.connection.readyState !== 1) {
      // In case MongoDB is temporarily unreachable, respond with a fallback so client flow isn't blocked
      return res.status(200).json({
        success: true,
        offlineMode: true,
        message: 'MongoDB is currently disconnected; user logged in successfully in session.',
        user: {
          clerkId,
          email,
          fullName: fullName || `${firstName || ''} ${lastName || ''}`.trim() || email.split('@')[0],
          imageUrl: imageUrl || '',
        },
      });
    }

    const computedFullName = fullName || `${firstName || ''} ${lastName || ''}`.trim() || email.split('@')[0];

    const updatePayload = {
      clerkId,
      email: email.toLowerCase().trim(),
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

// Update Profile Details (Department, Year, Reg Number, Interests)
app.put('/api/users/:clerkId', async (req, res) => {
  try {
    const { clerkId } = req.params;
    const { department, year, regNumber, domainInterests, githubUrl, linkedinUrl } = req.body;

    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        error: 'Database service unavailable.',
      });
    }

    const updatedUser = await User.findOneAndUpdate(
      { clerkId },
      {
        $set: {
          department,
          year,
          regNumber,
          domainInterests,
          githubUrl,
          linkedinUrl,
        },
      },
      { new: true }
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
