import { Router } from 'express';
import { uploadFiles } from '../controllers/upload.controller.js';
import { adminOnly, protect } from '../middleware/auth.middleware.js';
import { upload } from '../middleware/upload.middleware.js';

const router = Router();

router.post('/', protect, adminOnly, upload.any(), uploadFiles);

export default router;
