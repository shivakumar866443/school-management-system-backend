import { Router } from 'express';
import { body } from 'express-validator';
import {
  createAdmission,
  deleteAdmission,
  getAdmissionById,
  getAdmissions,
  updateAdmission
} from '../controllers/admission.controller.js';
import { adminOnly, protect } from '../middleware/auth.middleware.js';
import { upload } from '../middleware/upload.middleware.js';

const router = Router();

router.get('/', protect, adminOnly, getAdmissions);
router.get('/:id', protect, adminOnly, getAdmissionById);
router.post(
  '/',
  upload.any(),
  [
    body('studentName').notEmpty().withMessage('Student name is required'),
    body('applyingForGrade').notEmpty().withMessage('Applying grade is required'),
    body('parentName').notEmpty().withMessage('Parent name is required'),
    body('phone').notEmpty().withMessage('Phone is required')
  ],
  createAdmission
);
router.put('/:id', protect, adminOnly, upload.any(), updateAdmission);
router.delete('/:id', protect, adminOnly, deleteAdmission);

export default router;
