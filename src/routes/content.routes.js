import { Router } from 'express';
import {
  createContent,
  deleteContent,
  getContentById,
  getContentList,
  updateContent
} from '../controllers/content.controller.js';
import { adminOnly, protect } from '../middleware/auth.middleware.js';
import { upload } from '../middleware/upload.middleware.js';

const router = Router();

router.get('/:type', getContentList);
router.get('/:type/:id', getContentById);
router.post('/:type', protect, adminOnly, upload.any(), createContent);
router.put('/:type/:id', protect, adminOnly, upload.any(), updateContent);
router.delete('/:type/:id', protect, adminOnly, deleteContent);

export default router;
