import ContactMessage from '../models/ContactMessage.js';
import { sendMail } from '../services/mail.service.js';
import { validationResult } from 'express-validator';

export async function createContactMessage(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error(errors.array()[0].msg);
      error.statusCode = 400;
      throw error;
    }

    const message = await ContactMessage.create(req.body);
    await sendMail({
      to: process.env.ADMIN_NOTIFY_EMAIL,
      subject: 'New school website contact message',
      text: `${message.name} sent a message: ${message.message}`,
      html: `<p><strong>${message.name}</strong> sent a message.</p><p>${message.message}</p><p>Contact: ${message.emailOrPhone}</p>`
    });
    res.status(201).json({ success: true, data: message });
  } catch (error) {
    next(error);
  }
}
