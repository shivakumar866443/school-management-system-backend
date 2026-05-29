import Student from '../models/Student.js';
import { buildPayload } from '../utils/requestPayload.js';

export async function getStudents(req, res, next) {
  try {
    const query = {};
    if (req.query.status) query.status = req.query.status;
    if (req.query.grade) query.grade = req.query.grade;

    const students = await Student.find(query).sort({ createdAt: -1 });
    res.json({ success: true, count: students.length, data: students });
  } catch (error) {
    next(error);
  }
}

export async function getStudentById(req, res, next) {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      res.status(404);
      throw new Error('Student not found');
    }
    res.json({ success: true, data: student });
  } catch (error) {
    next(error);
  }
}

export async function createStudent(req, res, next) {
  try {
    const student = await Student.create(buildPayload(req));
    res.status(201).json({ success: true, data: student });
  } catch (error) {
    next(error);
  }
}

export async function updateStudent(req, res, next) {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, buildPayload(req), {
      new: true,
      runValidators: true
    });
    if (!student) {
      res.status(404);
      throw new Error('Student not found');
    }
    res.json({ success: true, data: student });
  } catch (error) {
    next(error);
  }
}

export async function deleteStudent(req, res, next) {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      res.status(404);
      throw new Error('Student not found');
    }
    res.json({ success: true, message: 'Student deleted successfully' });
  } catch (error) {
    next(error);
  }
}
