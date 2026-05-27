import cors from 'cors';
import dotenv from 'dotenv';
import ejsLayouts from 'express-ejs-layouts';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import adminRoutes from './routes/admin.routes.js';
import admissionRoutes from './routes/admission.routes.js';
import authRoutes from './routes/auth.routes.js';
import contactRoutes from './routes/contact.routes.js';
import employeeRoutes from './routes/employee.routes.js';
import studentRoutes from './routes/student.routes.js';
import { errorHandler, notFound } from './middleware/error.middleware.js';

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(ejsLayouts);
app.set('layout', 'layouts/main');

app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: process.env.CLIENT_URL || '*', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'school-node-api' });
});

app.get('/', (req, res) => {
  res.render('dashboard', {
    title: 'School API Dashboard',
    cards: [
      { label: 'Students API', value: '/api/students' },
      { label: 'Employees API', value: '/api/employees' },
      { label: 'Admissions API', value: '/api/admissions' },
      { label: 'Contact API', value: '/api/contact' }
    ]
  });
});

app.use('/admin', adminRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admissions', admissionRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
