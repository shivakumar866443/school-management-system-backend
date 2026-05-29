import multer from 'multer';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, '..', '..', 'uploads');

fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const baseName = path
      .basename(file.originalname, ext)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    cb(null, `${Date.now()}-${baseName || 'file'}${ext}`);
  }
});

const allowedMimeTypes = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
];

function fileFilter(req, file, cb) {
  if (!allowedMimeTypes.includes(file.mimetype)) {
    cb(new Error('Unsupported file type'));
    return;
  }
  cb(null, true);
}

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: Number(process.env.MAX_UPLOAD_SIZE || 5 * 1024 * 1024),
    files: Number(process.env.MAX_UPLOAD_FILES || 10)
  }
});

export function toFileRecords(files = []) {
  return files.map((file) => ({
    fieldName: file.fieldname,
    originalName: file.originalname,
    fileName: file.filename,
    mimeType: file.mimetype,
    size: file.size,
    url: `/uploads/${file.filename}`
  }));
}
