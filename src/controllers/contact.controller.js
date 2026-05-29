import ContactMessage from '../models/ContactMessage.js';
import { sendMail } from '../services/mail.service.js';
import { buildPayload } from '../utils/requestPayload.js';
import { validationResult } from 'express-validator';

export async function createContactMessage(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error(errors.array()[0].msg);
      error.statusCode = 400;
      throw error;
    }

    const message = await ContactMessage.create(buildPayload(req));
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

export async function getContactMessages(req, res, next) {
  try {
    const query = {};
    if (req.query.status) query.status = req.query.status;

    const messages = await ContactMessage.find(query).sort({ createdAt: -1 });
    res.json({ success: true, count: messages.length, data: messages });
  } catch (error) {
    next(error);
  }
}

export async function getContactMessageById(req, res, next) {
  try {
    const message = await ContactMessage.findById(req.params.id);
    if (!message) {
      res.status(404);
      throw new Error('Contact message not found');
    }
    res.json({ success: true, data: message });
  } catch (error) {
    next(error);
  }
}

export async function updateContactMessage(req, res, next) {
  try {
    const message = await ContactMessage.findByIdAndUpdate(req.params.id, buildPayload(req), {
      new: true,
      runValidators: true
    });
    if (!message) {
      res.status(404);
      throw new Error('Contact message not found');
    }
    res.json({ success: true, data: message });
  } catch (error) {
    next(error);
  }
}

export async function deleteContactMessage(req, res, next) {
  try {
    const message = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!message) {
      res.status(404);
      throw new Error('Contact message not found');
    }
    res.json({ success: true, message: 'Contact message deleted successfully' });
  } catch (error) {
    next(error);
  }
}
