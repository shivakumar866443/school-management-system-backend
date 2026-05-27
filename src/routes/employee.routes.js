import { Router } from 'express';
import {
  createEmployee,
  deleteEmployee,
  getEmployeeById,
  getEmployees,
  updateEmployee
} from '../controllers/employee.controller.js';
import { adminOnly, protect } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', protect, adminOnly, getEmployees);
router.post('/', protect, adminOnly, createEmployee);
router.get('/:id', protect, adminOnly, getEmployeeById);
router.put('/:id', protect, adminOnly, updateEmployee);
router.delete('/:id', protect, adminOnly, deleteEmployee);

export default router;
