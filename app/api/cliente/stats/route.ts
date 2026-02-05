import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    const { rows } = await sql`
      SELECT 
        u.nombre, 
        u.email, 
        s.* 
      FROM users u
      JOIN player_stats s ON u.id = s.user_id
      WHERE u.email = ${email}
    `;

    return NextResponse.json(rows[0] || { error: 'No encontrado' });
  } catch (error) {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}