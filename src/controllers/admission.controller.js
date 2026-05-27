import Admission from '../models/Admission.js';
import { sendMail } from '../services/mail.service.js';
import { validationResult } from 'express-validator';

export async function createAdmission(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error(errors.array()[0].msg);
      error.statusCode = 400;
      throw error;
    }

    const admission = await Admission.create(req.body);
    await sendMail({
      to: process.env.ADMIN_NOTIFY_EMAIL,
      subject: 'New admission enquiry',
      text: `${admission.parentName} submitted admission enquiry for ${admission.studentName}`,
      html: `<p>New admission enquiry for <strong>${admission.studentName}</strong>.</p><p>Class: ${admission.applyingForGrade}</p><p>Parent: ${admission.parentName}</p><p>Phone: ${admission.phone}</p>`
    });
    res.status(201).json({ success: true, data: admission });
  } catch (error) {
    next(error);
  }
}

export async function getAdmissions(req, res, next) {
  try {
    const admissions = await Admission.find().sort({ createdAt: -1 });
    res.json({ success: true, count: admissions.length, data: admissions });
  } catch (error) {
    next(error);
  }
}
