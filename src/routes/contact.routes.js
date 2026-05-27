import { Router } from 'express';
import { body } from 'express-validator';
import { createContactMessage } from '../controllers/contact.controller.js';

const router = Router();

router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('emailOrPhone').notEmpty().withMessage('Email or phone is required'),
    body('message').notEmpty().withMessage('Message is required')
  ],
  createContactMessage
);

export default router;
