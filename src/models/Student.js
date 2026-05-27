import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
  {
    admissionNo: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    grade: { type: String, required: true, trim: true },
    parentName: { type: String, required: true, trim: true },
    parentPhone: { type: String, required: true, trim: true },
    parentEmail: { type: String, trim: true },
    address: { type: String, trim: true },
    attendance: { type: Number, default: 0 },
    marks: { type: Number, default: 0 },
    status: { type: String, default: 'Active' },
    history: [
      {
        title: String,
        note: String,
        date: { type: Date, default: Date.now }
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model('Student', studentSchema);
