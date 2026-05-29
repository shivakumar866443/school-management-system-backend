import { Router } from 'express';
import {
  createStudent,
  deleteStudent,
  getStudentById,
  getStudents,
  updateStudent
} from '../controllers/student.controller.js';
import { adminOnly, protect } from '../middleware/auth.middleware.js';
import { upload } from '../middleware/upload.middleware.js';

const router = Router();

router.get('/', protect, adminOnly, getStudents);
router.post('/', protect, adminOnly, upload.any(), createStudent);
router.get('/:id', protect, adminOnly, getStudentById);
router.put('/:id', protect, adminOnly, upload.any(), updateStudent);
router.delete('/:id', protect, adminOnly, deleteStudent);

export default router;
