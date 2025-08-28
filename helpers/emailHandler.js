import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();


const transporter = nodemailer.createTransport({
  service: 'gmail', // tells Nodemailer to use Gmail settings
  auth: {
    user: process.env.EMAIL_USER, // your Gmail address
    pass: process.env.EMAIL_PASS  // your Gmail App Password
  }
});

export async function sendEmail(to, subject, html) {
  try {
    let info = await transporter.sendMail({
      from: `"Marimar Crochet" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html
    });
    console.log("Email sent:", info.messageId);
  } catch (err) {
    console.error("Error while sending email:", err);
  }
}
