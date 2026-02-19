import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { rows } = await sql`
      SELECT u.id, u.nombre, u.email, u.activo, s.equipo, s.categoria 
      FROM users u
      LEFT JOIN player_stats s ON u.id = s.user_id
      WHERE u.rol = 'cliente'
      ORDER BY u.id DESC
    `;
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: 'Error al cargar jugadores' }, { status: 500 });
  }
}

// PUT: Activar o Desactivar jugador 
export async function PUT(request: Request) {
  try {
    const { id, activo } = await request.json();
    await sql`UPDATE users SET activo=${activo} WHERE id=${id}`;
    return NextResponse.json({ message: 'Estado actualizado' });
  } catch (error) {
    return NextResponse.json({ error: 'Error al actualizar' }, { status: 500 });
  }
}