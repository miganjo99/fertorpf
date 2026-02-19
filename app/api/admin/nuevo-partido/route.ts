import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      user_id, jornada, fecha, contrincante, es_local, resultado, 
      goles_equipo_favor, goles_equipo_contra, 
      min_jugados, goles, asistencias, tarjeta_amarilla, tarjeta_roja, titular 
    } = body;

    await sql`
      INSERT INTO partidos (
        user_id, jornada, fecha, contrincante, es_local, resultado, 
        goles_equipo_favor, goles_equipo_contra, 
        min_jugados, goles, asistencias, tarjeta_amarilla, tarjeta_roja, titular
      ) VALUES (
        ${user_id}, ${jornada}, ${fecha}, ${contrincante},  ${es_local}, ${resultado},
        ${goles_equipo_favor}, ${goles_equipo_contra},
        ${min_jugados}, ${goles}, ${asistencias}, ${tarjeta_amarilla}, ${tarjeta_roja}, ${titular}
      )
    `;

    // 2. ACTUALIZAR AUTOMATICAMENTE LOS STATS TOTALES 
    // Sumamos lo nuevo a lo que ya tenia acumulado
    await sql`
      UPDATE player_stats
      SET 
        partidos_jugados = partidos_jugados + 1,
        partidos_titular = partidos_titular + ${titular ? 1 : 0},
        minutos_jugados = minutos_jugados + ${min_jugados},
        goles = goles + ${goles},
        asistencias = asistencias + ${asistencias},
        total_tarjetas_amarillas = total_tarjetas_amarillas + ${tarjeta_amarilla ? 1 : 0},
        total_tarjetas_rojas = total_tarjetas_rojas + ${tarjeta_roja ? 1 : 0}
      WHERE user_id = ${user_id}
    `;

    return NextResponse.json({ message: 'Partido guardado y estadísticas actualizadas' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error al procesar el partido' }, { status: 500 });
  }
}