import nodemailer from 'nodemailer';
import 'dotenv/config';

export async function sendEmail(to, subject, htmlContent) {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // or use another SMTP provider
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"MariMar Crochet Shop" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html: htmlContent,
  });
}
