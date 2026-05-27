# School Node API

Separate backend project for the school portal. This does not touch the React static website.

## Stack

- Express.js
- EJS admin pages
- MongoDB with Mongoose
- JWT authentication
- Nodemailer mail service

## Setup

```bash
npm install
copy .env.example .env
npm run dev
```

Server URL:

```text
http://localhost:5000
```

## Main API Routes

```text
POST   /api/auth/register
POST   /api/auth/login
GET    /api/students
POST   /api/students
GET    /api/students/:id
PUT    /api/students/:id
DELETE /api/students/:id
GET    /api/employees
POST   /api/employees
GET    /api/employees/:id
PUT    /api/employees/:id
DELETE /api/employees/:id
POST   /api/contact
POST   /api/admissions
```

Protected student and employee write APIs require:

```text
Authorization: Bearer <jwt_token>
```

## EJS Pages

```text
GET /              Dashboard
GET /admin/login   Admin login page
GET /admin         Admin home page
```

## Notes

This is ready for API development. File upload can be added later with `multer` when the client confirms upload requirements.
