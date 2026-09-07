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
    regNumber: {
      type: String,
      default: '',
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
