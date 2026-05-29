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

const employeeSchema = new mongoose.Schema(
  {
    employeeNo: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    department: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true },
    experience: { type: String, trim: true },
    status: { type: String, default: 'Active' },
    joiningDate: Date,
    extraFields: { type: mongoose.Schema.Types.Mixed, default: {} },
    files: [fileSchema]
  },
  { timestamps: true }
);

export default mongoose.model('Employee', employeeSchema);
