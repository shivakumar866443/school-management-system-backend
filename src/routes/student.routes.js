import { Router } from 'express';
import {
  createStudent,
  deleteStudent,
  getStudentById,
  getStudents,
  updateStudent
} from '../controllers/student.controller.js';
import { adminOnly, protect } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', protect, adminOnly, getStudents);
router.post('/', protect, adminOnly, createStudent);
router.get('/:id', protect, adminOnly, getStudentById);
router.put('/:id', protect, adminOnly, updateStudent);
router.delete('/:id', protect, adminOnly, deleteStudent);

export default router;
