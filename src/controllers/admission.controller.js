import Admission from '../models/Admission.js';
import { sendMail } from '../services/mail.service.js';
import { buildPayload } from '../utils/requestPayload.js';
import { validationResult } from 'express-validator';

export async function createAdmission(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error(errors.array()[0].msg);
      error.statusCode = 400;
      throw error;
    }

    const admission = await Admission.create(buildPayload(req));
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
    const query = {};
    if (req.query.status) query.status = req.query.status;

    const admissions = await Admission.find(query).sort({ createdAt: -1 });
    res.json({ success: true, count: admissions.length, data: admissions });
  } catch (error) {
    next(error);
  }
}

export async function getAdmissionById(req, res, next) {
  try {
    const admission = await Admission.findById(req.params.id);
    if (!admission) {
      res.status(404);
      throw new Error('Admission not found');
    }
    res.json({ success: true, data: admission });
  } catch (error) {
    next(error);
  }
}

export async function updateAdmission(req, res, next) {
  try {
    const admission = await Admission.findByIdAndUpdate(req.params.id, buildPayload(req), {
      new: true,
      runValidators: true
    });
    if (!admission) {
      res.status(404);
      throw new Error('Admission not found');
    }
    res.json({ success: true, data: admission });
  } catch (error) {
    next(error);
  }
}

export async function deleteAdmission(req, res, next) {
  try {
    const admission = await Admission.findByIdAndDelete(req.params.id);
    if (!admission) {
      res.status(404);
      throw new Error('Admission not found');
    }
    res.json({ success: true, message: 'Admission deleted successfully' });
  } catch (error) {
    next(error);
  }
}
