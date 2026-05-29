import { Router } from 'express';
import {
  createEmployee,
  deleteEmployee,
  getEmployeeById,
  getEmployees,
  updateEmployee
} from '../controllers/employee.controller.js';
import { adminOnly, protect } from '../middleware/auth.middleware.js';
import { upload } from '../middleware/upload.middleware.js';

const router = Router();

router.get('/', protect, adminOnly, getEmployees);
router.post('/', protect, adminOnly, upload.any(), createEmployee);
router.get('/:id', protect, adminOnly, getEmployeeById);
router.put('/:id', protect, adminOnly, upload.any(), updateEmployee);
router.delete('/:id', protect, adminOnly, deleteEmployee);

export default router;
