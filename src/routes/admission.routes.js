import { Router } from 'express';
import { body } from 'express-validator';
import { createAdmission, getAdmissions } from '../controllers/admission.controller.js';
import { adminOnly, protect } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', protect, adminOnly, getAdmissions);
router.post(
  '/',
  [
    body('studentName').notEmpty().withMessage('Student name is required'),
    body('applyingForGrade').notEmpty().withMessage('Applying grade is required'),
    body('parentName').notEmpty().withMessage('Parent name is required'),
    body('phone').notEmpty().withMessage('Phone is required')
  ],
  createAdmission
);

export default router;
