import Employee from '../models/Employee.js';
import { sendMail } from '../services/mail.service.js';
import { buildPayload } from '../utils/requestPayload.js';

export async function getEmployees(req, res, next) {
  try {
    const query = {};
    if (req.query.status) query.status = req.query.status;
    if (req.query.department) query.department = req.query.department;
    if (req.query.role) query.role = req.query.role;

    const employees = await Employee.find(query).sort({ createdAt: -1 });
    res.json({ success: true, count: employees.length, data: employees });
  } catch (error) {
    next(error);
  }
}

export async function getEmployeeById(req, res, next) {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      res.status(404);
      throw new Error('Employee not found');
    }
    res.json({ success: true, data: employee });
  } catch (error) {
    next(error);
  }
}

export async function createEmployee(req, res, next) {
  try {
    const employee = await Employee.create(buildPayload(req));

    if (employee.email) {
      await sendMail({
        to: employee.email,
        subject: 'Welcome to the school team',
        text: `Dear ${employee.name}, welcome to the school team as ${employee.role}.`,
        html: `<p>Dear <strong>${employee.name}</strong>,</p><p>Welcome to the school team as <strong>${employee.role}</strong>.</p><p>Employee No: ${employee.employeeNo}</p>`
      });
    }

    res.status(201).json({ success: true, data: employee });
  } catch (error) {
    next(error);
  }
}

export async function updateEmployee(req, res, next) {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, buildPayload(req), {
      new: true,
      runValidators: true
    });
    if (!employee) {
      res.status(404);
      throw new Error('Employee not found');
    }
    res.json({ success: true, data: employee });
  } catch (error) {
    next(error);
  }
}

export async function deleteEmployee(req, res, next) {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      res.status(404);
      throw new Error('Employee not found');
    }
    res.json({ success: true, message: 'Employee deleted successfully' });
  } catch (error) {
    next(error);
  }
}
