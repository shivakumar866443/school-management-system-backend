# School Management System Backend

Express.js, MongoDB, JWT, file upload, dynamic content, EJS admin pages, and Nodemailer backend for the school management frontend.

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

Protected admin APIs require:

```text
Authorization: Bearer <jwt_token>
```

For file upload, send `multipart/form-data`. Any file field name is accepted, such as `photo`, `resume`, `documents`, or `image`. Uploaded files are available from:

```text
http://localhost:5000/uploads/<fileName>
```

## Mail Configuration

Configure these values in `.env`:

```text
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_SECURE=false
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_app_password
MAIL_FROM="School Portal <your_email@gmail.com>"
ADMIN_NOTIFY_EMAIL=admin@school.com
```

Employee creation sends a welcome mail to `employee.email`. Admission and contact submissions notify `ADMIN_NOTIFY_EMAIL`. If SMTP is not configured or delivery fails, the API still succeeds and logs the mail issue.

## Endpoints

### Health

`GET /health`

Response:

```json
{ "status": "ok", "service": "school-node-api" }
```

### Auth

`POST /api/auth/register`

Payload:

```json
{
  "name": "Admin User",
  "email": "admin@school.com",
  "password": "secret123",
  "role": "admin"
}
```

Response:

```json
{
  "success": true,
  "user": { "id": "...", "name": "Admin User", "email": "admin@school.com", "role": "admin" },
  "token": "jwt_token"
}
```

`POST /api/auth/login`

Payload:

```json
{ "email": "admin@school.com", "password": "secret123" }
```

Response:

```json
{
  "success": true,
  "user": { "id": "...", "name": "Admin User", "email": "admin@school.com", "role": "admin" },
  "token": "jwt_token"
}
```

### Students

`GET /api/students?status=Active&grade=10`  
`GET /api/students/:id`  
`POST /api/students`  
`PUT /api/students/:id`  
`DELETE /api/students/:id`

Create or update JSON payload:

```json
{
  "admissionNo": "ADM001",
  "name": "Aarav Kumar",
  "grade": "10",
  "parentName": "Ravi Kumar",
  "parentPhone": "9876543210",
  "parentEmail": "parent@example.com",
  "address": "Hyderabad",
  "attendance": 95,
  "marks": 88,
  "status": "Active",
  "extraFields": {
    "bloodGroup": "O+",
    "transportRoute": "Route 4"
  }
}
```

Multipart payload: same fields plus files, for example `photo` or `documents`. For multipart, send `extraFields` as a JSON string.

List response:

```json
{ "success": true, "count": 1, "data": [{ "_id": "...", "name": "Aarav Kumar", "files": [] }] }
```

### Employees

`GET /api/employees?status=Active&department=Science&role=Teacher`  
`GET /api/employees/:id`  
`POST /api/employees`  
`PUT /api/employees/:id`  
`DELETE /api/employees/:id`

Create or update JSON payload:

```json
{
  "employeeNo": "EMP001",
  "name": "Priya Sharma",
  "role": "Teacher",
  "department": "Science",
  "phone": "9876543210",
  "email": "priya@example.com",
  "experience": "5 years",
  "status": "Active",
  "joiningDate": "2026-06-01",
  "extraFields": {
    "qualification": "M.Sc Physics",
    "emergencyContact": "9000000000"
  }
}
```

When to use: create an employee after joining is confirmed. The API sends a joining/welcome mail to `email`.

Response:

```json
{ "success": true, "data": { "_id": "...", "employeeNo": "EMP001", "files": [] } }
```

### Admissions

`GET /api/admissions?status=New`  
`GET /api/admissions/:id`  
`POST /api/admissions` public  
`PUT /api/admissions/:id`  
`DELETE /api/admissions/:id`

Payload:

```json
{
  "studentName": "Anika Rao",
  "applyingForGrade": "6",
  "parentName": "Suresh Rao",
  "phone": "9876543210",
  "email": "parent@example.com",
  "message": "Need admission details",
  "extraFields": {
    "previousSchool": "ABC School"
  }
}
```

When to use: frontend admission enquiry form. This sends a notification mail to `ADMIN_NOTIFY_EMAIL`.

Response:

```json
{ "success": true, "data": { "_id": "...", "status": "New" } }
```

### Contact

`GET /api/contact?status=New`  
`GET /api/contact/:id`  
`POST /api/contact` public  
`PUT /api/contact/:id`  
`DELETE /api/contact/:id`

Payload:

```json
{
  "name": "Visitor Name",
  "emailOrPhone": "visitor@example.com",
  "message": "Please call me back",
  "extraFields": {
    "source": "homepage"
  }
}
```

When to use: website contact form. This sends a notification mail to `ADMIN_NOTIFY_EMAIL`.

Response:

```json
{ "success": true, "data": { "_id": "...", "status": "New" } }
```

### Dynamic Content

Use this for frontend-managed modules such as notices, events, gallery, sliders, pages, facilities, achievements, circulars, or any future section without creating a new table.

`GET /api/content/:type?status=Published` public  
`GET /api/content/:type/:id` public  
`POST /api/content/:type`  
`PUT /api/content/:type/:id`  
`DELETE /api/content/:type/:id`

Example:

```text
POST /api/content/notices
```

Payload:

```json
{
  "title": "Annual Day",
  "slug": "annual-day-2026",
  "status": "Published",
  "data": {
    "description": "Annual day celebration",
    "eventDate": "2026-06-20",
    "displayOrder": 1
  }
}
```

Multipart payload: same fields plus files, for example `image`, `banner`, or `attachment`. For multipart, send `data` as a JSON string.

Response:

```json
{ "success": true, "data": { "_id": "...", "type": "notices", "title": "Annual Day", "files": [] } }
```

### Uploads

`POST /api/uploads`

When to use: upload files first and store returned URLs in frontend state or in a later content/student/employee API call.

Multipart payload:

```text
photo=<file>
documents=<file>
```

Response:

```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "fieldName": "photo",
      "originalName": "profile.png",
      "fileName": "1710000000000-profile.png",
      "mimeType": "image/png",
      "size": 102400,
      "url": "/uploads/1710000000000-profile.png"
    }
  ]
}
```

### Admin Pages

`GET /` dashboard  
`GET /admin/login` login page  
`GET /admin` admin home page
