import nodemailer from "nodemailer";

export async function sendEmail({ to, subject, text, html }) {
  // Transporter usando Gmail
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,      // tu correo Gmail
      pass: process.env.GMAIL_APP_PASS,  // app password
    },
  });

  const mailOptions = {
    from: `"Agenda Clínica" <${process.env.GMAIL_USER}>`,
    to,
    subject,
    text,
    html,
  };

  return transporter.sendMail(mailOptions);
}
