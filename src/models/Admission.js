import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema(
  {
    fieldName: String,
    originalName: String,
    fileName: String,
    mimeType: String,
    size: Number,
    url: String
  },
  { _id: false }
);

const admissionSchema = new mongoose.Schema(
  {
    studentName: { type: String, required: true, trim: true },
    applyingForGrade: { type: String, required: true, trim: true },
    parentName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true },
    message: { type: String, trim: true },
    status: { type: String, enum: ['New', 'Contacted', 'Admitted', 'Rejected'], default: 'New' },
    extraFields: { type: mongoose.Schema.Types.Mixed, default: {} },
    files: [fileSchema]
  },
  { timestamps: true }
);

export default mongoose.model('Admission', admissionSchema);
