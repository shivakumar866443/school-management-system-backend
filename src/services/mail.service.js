import { createTransporter } from '../config/mail.js';

export async function sendMail({ to, subject, html, text }) {
  if (!process.env.MAIL_HOST || !process.env.MAIL_USER || !process.env.MAIL_PASS) {
    console.log('Mail skipped. Configure MAIL_HOST, MAIL_USER, and MAIL_PASS in .env');
    return null;
  }

  const transporter = createTransporter();
  return transporter.sendMail({
    from: process.env.MAIL_FROM,
    to,
    subject,
    text,
    html
  });
}
