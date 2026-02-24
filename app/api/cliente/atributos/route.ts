import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    
    const { rows } = await sql`
      SELECT a.* FROM player_attributes a
      JOIN users u ON a.user_id = u.id
      WHERE u.email = ${email}
    `;

    if (rows.length > 0) {
      return NextResponse.json(rows[0]);
    } else {
      return NextResponse.json({
        velocidad: 50, fuerza: 50, resistencia: 50, 
        tecnica: 50, tactica: 50, mentalidad: 50
      });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Error al cargar atributos' }, { status: 500 });
  }
}