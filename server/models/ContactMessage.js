import mongoose from 'mongoose';

const contactMessageSchema = new mongoose.Schema({
  referenceId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  category: {
    type: String,
    default: 'General Inquiry',
    trim: true,
  },
  subject: {
    type: String,
    required: true,
    trim: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ['new', 'read', 'responded', 'archived'],
    default: 'new',
  },
  emailDispatched: {
    type: Boolean,
    default: false,
  },
  emailError: {
    type: String,
    default: null,
  }
}, {
  timestamps: true,
});

const ContactMessage = mongoose.model('ContactMessage', contactMessageSchema);

export default ContactMessage;
