import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    const { rows } = await sql`
      SELECT p.* FROM partidos p
      JOIN users u ON u.id = p.user_id
      WHERE u.email = ${email}
      ORDER BY p.jornada DESC
    `;

    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: 'Error al cargar partidos' }, { status: 500 });
  }
}