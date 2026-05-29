import { createTransporter } from '../config/mail.js';

export async function sendMail({ to, subject, html, text }) {
  if (!to || !process.env.MAIL_HOST || !process.env.MAIL_USER || !process.env.MAIL_PASS) {
    console.log('Mail skipped. Configure MAIL_HOST, MAIL_USER, and MAIL_PASS in .env');
    return null;
  }

  const transporter = createTransporter();
  try {
    return await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to,
      subject,
      text,
      html
    });
  } catch (error) {
    console.log(`Mail skipped. ${error.message}`);
    return null;
  }
}
