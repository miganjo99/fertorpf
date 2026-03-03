import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

async function recalcularStats(userId: number) {
  await sql`
    UPDATE player_stats
    SET 
      partidos_jugados = (SELECT COUNT(*) FROM partidos WHERE user_id = ${userId}),
      partidos_titular = (SELECT COUNT(*) FROM partidos WHERE user_id = ${userId} AND titular = true),
      minutos_jugados = COALESCE((SELECT SUM(min_jugados) FROM partidos WHERE user_id = ${userId}), 0),
      goles = COALESCE((SELECT SUM(goles) FROM partidos WHERE user_id = ${userId}), 0),
      asistencias = COALESCE((SELECT SUM(asistencias) FROM partidos WHERE user_id = ${userId}), 0),
      total_tarjetas_amarillas = (SELECT COUNT(*) FROM partidos WHERE user_id = ${userId} AND tarjeta_amarilla = true),
      total_tarjetas_rojas = (SELECT COUNT(*) FROM partidos WHERE user_id = ${userId} AND tarjeta_roja = true)
    WHERE user_id = ${userId};
  `;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  try {
    const { rows } = await sql`
      SELECT * FROM partidos 
      WHERE user_id = ${userId} 
      ORDER BY jornada DESC, fecha DESC
    `;
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: 'Error al cargar partidos' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    
    await sql`
      UPDATE partidos SET
        jornada = ${body.jornada}, contrincante = ${body.contrincante}, fecha = ${body.fecha}, 
        es_local = ${body.es_local}, resultado = ${body.resultado || ''}, 
        goles_equipo_favor = ${body.goles_equipo_favor}, goles_equipo_contra = ${body.goles_equipo_contra}, 
        min_jugados = ${body.min_jugados}, goles = ${body.goles}, asistencias = ${body.asistencias}, 
        tarjeta_amarilla = ${body.tarjeta_amarilla}, tarjeta_roja = ${body.tarjeta_roja}, titular = ${body.titular}
      WHERE id = ${body.id} AND user_id = ${body.user_id}
    `;

    await recalcularStats(body.user_id);

    return NextResponse.json({ message: 'Partido actualizado y stats recalculadas' });
  } catch (error: any) {
    console.error("Error en PUT partido:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const userId = searchParams.get('userId');

  try {
    await sql`DELETE FROM partidos WHERE id = ${id} AND user_id = ${userId}`;
    
    await recalcularStats(Number(userId));

    return NextResponse.json({ message: 'Partido eliminado y stats recalculadas' });
  } catch (error: any) {
    console.error("Error en DELETE partido:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}