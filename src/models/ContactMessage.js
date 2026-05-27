import mongoose from 'mongoose';

const contactMessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    emailOrPhone: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    status: { type: String, enum: ['New', 'Closed'], default: 'New' }
  },
  { timestamps: true }
);

export default mongoose.model('ContactMessage', contactMessageSchema);
