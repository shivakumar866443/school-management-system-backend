import mongoose from 'mongoose';

const admissionSchema = new mongoose.Schema(
  {
    studentName: { type: String, required: true, trim: true },
    applyingForGrade: { type: String, required: true, trim: true },
    parentName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true },
    message: { type: String, trim: true },
    status: { type: String, enum: ['New', 'Contacted', 'Admitted', 'Rejected'], default: 'New' }
  },
  { timestamps: true }
);

export default mongoose.model('Admission', admissionSchema);
