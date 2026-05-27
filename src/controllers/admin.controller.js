export function showLogin(req, res) {
  res.render('admin/login', { title: 'Admin Login' });
}

export function showAdmin(req, res) {
  res.render('admin/index', {
    title: 'Admin Panel',
    modules: [
      { name: 'Students', endpoint: '/api/students', action: 'Manage student records' },
      { name: 'Employees', endpoint: '/api/employees', action: 'Manage teacher and staff records' },
      { name: 'Admissions', endpoint: '/api/admissions', action: 'Review admission enquiries' },
      { name: 'Contact', endpoint: '/api/contact', action: 'Receive contact messages' }
    ]
  });
}
