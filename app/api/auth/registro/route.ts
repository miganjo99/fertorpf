import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { nombre, email, password } = await request.json();

    // Insertamos el nuevo usuario como 'cliente' por defecto
    await sql`
      INSERT INTO users (nombre, email, password, rol)
      VALUES (${nombre}, ${email}, ${password}, 'cliente')
    `;

    return NextResponse.json({ message: 'Usuario creado exitosamente' });
  } catch (error) {
    return NextResponse.json({ error: 'Error al registrar usuario' }, { status: 500 });
  }
}