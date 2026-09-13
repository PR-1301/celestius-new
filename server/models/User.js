import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      index: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return typeof v === 'string' && v.endsWith('@citchennai.net');
        },
        message: 'Only @citchennai.net university accounts are permitted.',
      },
    },
    firstName: {
      type: String,
      default: '',
    },
    lastName: {
      type: String,
      default: '',
    },
    fullName: {
      type: String,
      default: '',
    },
    imageUrl: {
      type: String,
      default: '',
    },
    department: {
      type: String,
      default: '',
    },
    year: {
      type: String,
      default: '1st Year',
    },
    section: {
      type: String,
      default: '',
      trim: true,
      uppercase: true,
    },
    mobileNumber: {
      type: String,
      default: '',
      trim: true,
    },
    regNumber: {
      type: String,
      default: '',
    },
    isProfileComplete: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ['student', 'member', 'lead', 'admin'],
      default: 'student',
    },
    domainInterests: {
      type: [String],
      default: [],
    },
    githubUrl: {
      type: String,
      default: '',
    },
    linkedinUrl: {
      type: String,
      default: '',
    },
    lastLoginAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('User', UserSchema);
