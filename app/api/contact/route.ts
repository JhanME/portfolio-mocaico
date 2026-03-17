import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Faltan campos requeridos.' }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: 'Portafolio <onboarding@resend.dev>',
    to: 'mocaicojhan@gmail.com',
    subject: `Nuevo mensaje de ${name}`,
    text: `Nombre: ${name}\nCorreo: ${email}\n\nMensaje:\n${message}`,
  });

  if (error) {
    console.error('Resend error:', error);
    return NextResponse.json({ error: 'Error al enviar el mensaje.' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
