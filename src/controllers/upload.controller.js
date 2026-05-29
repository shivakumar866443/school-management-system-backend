import { toFileRecords } from '../middleware/upload.middleware.js';

export async function uploadFiles(req, res, next) {
  try {
    res.status(201).json({
      success: true,
      count: req.files?.length || 0,
      data: toFileRecords(req.files)
    });
  } catch (error) {
    next(error);
  }
}
