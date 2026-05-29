import { Router } from 'express';
import { body } from 'express-validator';
import {
  createContactMessage,
  deleteContactMessage,
  getContactMessageById,
  getContactMessages,
  updateContactMessage
} from '../controllers/contact.controller.js';
import { adminOnly, protect } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', protect, adminOnly, getContactMessages);
router.get('/:id', protect, adminOnly, getContactMessageById);
router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('emailOrPhone').notEmpty().withMessage('Email or phone is required'),
    body('message').notEmpty().withMessage('Message is required')
  ],
  createContactMessage
);
router.put('/:id', protect, adminOnly, updateContactMessage);
router.delete('/:id', protect, adminOnly, deleteContactMessage);

export default router;
