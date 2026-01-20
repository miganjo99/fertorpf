import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Buscamos usuario que coincida email y contraseña
    const { rows } = await sql`SELECT * FROM users WHERE email=${email} AND password=${password}`;

    if (rows.length > 0) {
      const usuario = rows[0];
      // Devolvemos el usuario y su rol para que el frontend sepa a dónde redirigir
      return NextResponse.json({ success: true, rol: usuario.rol, nombre: usuario.nombre });
    } else {
      return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Error en el servidor' }, { status: 500 });
  }
}