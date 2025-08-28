import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // smtp.sendgrid.net
  port: process.env.SMTP_PORT, // 587
  secure: false, // true si usas 465, false si usas 587
  auth: {
    user: process.env.SMTP_USER, // normalmente 'apikey' para SendGrid
    pass: process.env.SMTP_PASS  // tu API key de SendGrid
  }
});

export async function sendEmail(to, subject, html) {
  try {
    let info = await transporter.sendMail({
      from: `"Marimar Crochet" <${process.env.EMAIL_FROM}>`, // orders@marimarcrochetapi.shop
      to,
      subject,
      html
    });
    console.log("Email sent:", info.messageId);
  } catch (err) {
    console.error("Error while sending email:", err);
  }
}
