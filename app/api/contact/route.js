import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "Todos los campos son obligatorios." }), { status: 400 });
    }

    // Configuración SMTP (ejemplo Gmail)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER, // tu correo
        pass: process.env.SMTP_PASS, // app password o contraseña
      },
    });

    await transporter.sendMail({
      from: email,
      to: process.env.SMTP_USER,
      subject: `Nuevo mensaje de contacto de ${name}`,
      text: message,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Error al enviar el mensaje" }), { status: 500 });
  }
}
