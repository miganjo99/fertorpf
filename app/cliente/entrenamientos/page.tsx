'use client';
import { useEffect, useState } from 'react';

export default function ClienteDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [partidos, setPartidos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario_activo');
    const email = usuarioGuardado ? JSON.parse(usuarioGuardado).email : 'juan@gmail.com';

    Promise.all([
      fetch('/api/cliente/stats', { method: 'POST', body: JSON.stringify({ email }) }).then(r => r.json()),
      fetch('/api/cliente/partidos', { method: 'POST', body: JSON.stringify({ email }) }).then(r => r.json())
    ]).then(([dataStats, dataPartidos]) => {
      setStats(dataStats);
      setPartidos(dataPartidos);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="p-10 text-center">Cargando perfil profesional...</div>;
  if (!stats) return <div className="p-10">Error al cargar datos.</div>;

  
  const mediaGoles = stats.partidos_jugados > 0 ? (stats.goles / stats.partidos_jugados).toFixed(2) : 0;
  const edad = stats.fecha_nacimiento 
    ? new Date().getFullYear() - new Date(stats.fecha_nacimiento).getFullYear() 
    : '-';

  return (
    <div className="space-y-8">
      
      {/* 1. FICHA TÉCNICA DEL JUGADOR */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 flex flex-col md:flex-row">
        {/* Foto y Datos Principales */}
        <div className="bg-slate-900 text-white p-8 md:w-1/3 flex flex-col items-center justify-center text-center">
          <div className="w-32 h-32 bg-gray-700 rounded-full mb-4 border-4 border-green-500 overflow-hidden">
             {/* Si tuviéramos foto real la pondríamos aquí */}
             <div className="w-full h-full flex items-center justify-center text-4xl">⚽</div>
          </div>
          <h1 className="text-2xl font-bold">{stats.nombre}</h1>
          <p className="text-green-400 font-bold">{stats.posicion || 'Jugador'}</p>
          <p className="text-sm text-gray-400 mt-1">{stats.equipo}</p>
          <div className="mt-4 flex gap-2">
             <span className="bg-slate-700 px-3 py-1 rounded text-xs">{stats.categoria}</span>
             <span className="bg-slate-700 px-3 py-1 rounded text-xs">{stats.ciudad}</span>
          </div>
        </div>

        {/* Datos Fisicos */}
        <div className="p-8 md:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
          <div className="text-center border-r border-gray-100">
             <p className="text-gray-500 text-xs font-bold uppercase">Altura</p>
             <p className="text-xl font-bold text-gray-900">{stats.altura} cm</p>
          </div>
          <div className="text-center border-r border-gray-100">
             <p className="text-gray-500 text-xs font-bold uppercase">Peso</p>
             <p className="text-xl font-bold text-gray-900">{stats.peso} kg</p>
          </div>
          <div className="text-center border-r border-gray-100">
             <p className="text-gray-500 text-xs font-bold uppercase">Edad</p>
             <p className="text-xl font-bold text-gray-900">{edad} años</p>
          </div>
          <div className="text-center">
             <p className="text-gray-500 text-xs font-bold uppercase">Pierna</p>
             <p className="text-xl font-bold text-gray-900 capitalize">{stats.pierna_dominante}</p>
          </div>
        </div>
      </div>

      {/* 2.MEDIAS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-green-500">
          <p className="text-xs text-gray-500 font-bold uppercase">Goles Totales</p>
          <p className="text-3xl font-bold text-gray-900">{stats.goles}</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-blue-500">
          <p className="text-xs text-gray-500 font-bold uppercase">Media Goles/P</p>
          <p className="text-3xl font-bold text-gray-900">{mediaGoles}</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-purple-500">
          <p className="text-xs text-gray-500 font-bold uppercase">Partidos Titular</p>
          <p className="text-3xl font-bold text-gray-900">{stats.partidos_titular}</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-yellow-500">
          <p className="text-xs text-gray-500 font-bold uppercase">Minutos Jugados</p>
          <p className="text-3xl font-bold text-gray-900">{stats.minutos_jugados}'</p>
        </div>
      </div>

      {/* 3. TABLAPARTIDOS  */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-900">Historial de Partidos</h3>
          <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-500">Temp. 23/24</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-bold">
              <tr>
                <th className="px-6 py-4">Jor</th>
                <th className="px-6 py-4">Rival</th>
                <th className="px-6 py-4 text-center">Resultado</th>
                <th className="px-6 py-4 text-center">Minutos</th>
                <th className="px-6 py-4 text-center">Goles</th>
                <th className="px-6 py-4 text-center">Asist</th>
                <th className="px-6 py-4 text-center">Tarjetas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {partidos.length === 0 ? (
                <tr><td colSpan={7} className="p-6 text-center text-gray-400">No hay partidos registrados aún.</td></tr>
              ) : (
                partidos.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-gray-400">J{p.jornada}</td>
                    <td className="px-6 py-4 font-bold text-gray-900">
                      {p.es_local ? (
                        <span>🏠 vs {p.contrincante}</span>
                      ) : (
                        <span>✈️ @ {p.contrincante}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2 py-1 rounded font-bold text-xs ${
                        p.goles_equipo_favor > p.goles_equipo_contra ? 'bg-green-100 text-green-700' :
                        p.goles_equipo_favor < p.goles_equipo_contra ? 'bg-red-100 text-red-700' : 
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {p.goles_equipo_favor} - {p.goles_equipo_contra}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center font-mono">{p.min_jugados}'</td>
                    <td className="px-6 py-4 text-center">
                      {p.goles > 0 ? <span className="font-bold text-green-600">⚽ {p.goles}</span> : '-'}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {p.asistencias > 0 ? <span className="font-bold text-blue-600">👟 {p.asistencias}</span> : '-'}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {p.tarjeta_roja && <span className="inline-block w-3 h-4 bg-red-500 rounded-sm mr-1"></span>}
                      {p.tarjeta_amarilla && <span className="inline-block w-3 h-4 bg-yellow-400 rounded-sm"></span>}
                      {!p.tarjeta_roja && !p.tarjeta_amarilla && <span className="text-gray-300">-</span>}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}