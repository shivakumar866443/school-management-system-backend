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

const contentSchema = new mongoose.Schema(
  {
    type: { type: String, required: true, trim: true, lowercase: true },
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true, lowercase: true },
    status: { type: String, enum: ['Draft', 'Published', 'Archived'], default: 'Published' },
    data: { type: mongoose.Schema.Types.Mixed, default: {} },
    files: [fileSchema]
  },
  { timestamps: true }
);

contentSchema.index({ type: 1, slug: 1 }, { unique: true });

export default mongoose.model('Content', contentSchema);
