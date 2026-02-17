import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { hashPassword } from '@/lib/auth'; 

export async function POST(request: Request) {
  try {
    const { nombre, email, password } = await request.json();

    const hashedPassword = await hashPassword(password);

    await sql`
      INSERT INTO users (nombre, email, password, rol)
      VALUES (${nombre}, ${email}, ${ hashedPassword }, 'cliente')
    `;

    return NextResponse.json({ message: 'Usuario creado exitosamente' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error al registrar usuario' }, { status: 500 });
  }
}