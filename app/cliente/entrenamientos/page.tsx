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

  if (loading) return <div className="p-10 text-center text-gray-500 font-heading animate-pulse">Cargando perfil profesional...</div>;
  if (!stats) return <div className="p-10 text-center text-red-500">Error al cargar datos.</div>;

  const mediaGoles = stats.partidos_jugados > 0 ? (stats.goles / stats.partidos_jugados).toFixed(2) : 0;
  const edad = stats.fecha_nacimiento 
    ? new Date().getFullYear() - new Date(stats.fecha_nacimiento).getFullYear() 
    : '-';

  return (
    <div className="space-y-8 font-sans">
      
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 flex flex-col md:flex-row">
        
        <div className="bg-[#111827] text-white p-8 md:w-1/3 flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-brand opacity-10 rounded-bl-full"></div>

          <div className="w-32 h-32 bg-gray-800 rounded-full mb-4 border-4 border-brand overflow-hidden shadow-2xl">
            <img 
              src={'/jugadores/' + stats.id + '.jpg'} 
              alt={stats.nombre} 
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1511886929837-354d827aae26?auto=format&fit=crop&q=80&w=200';
              }} 
            />
          </div>
          
          <h1 className="text-2xl font-black italic font-heading tracking-tight">{stats.nombre}</h1>
          <p className="text-[#FF4C4C] font-bold uppercase tracking-widest text-sm mt-1">{stats.posicion || 'Jugador'}</p>
          
          <div className="mt-4 w-full flex flex-col gap-2 items-center">
             <div className="bg-gray-800/50 border border-gray-700 px-4 py-1 rounded-full text-xs text-gray-300 font-bold w-fit">
                {stats.equipo}
             </div>
             <div className="flex gap-2">
               <span className="bg-gray-800 px-3 py-1 rounded text-xs text-gray-400">{stats.categoria}</span>
               <span className="bg-gray-800 px-3 py-1 rounded text-xs text-gray-400">{stats.ciudad}</span>
             </div>
          </div>
        </div>

        <div className="p-8 md:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-6 items-center bg-white">
          <div className="text-center border-r border-gray-100">
             <p className="text-gray-400 text-xs font-bold uppercase font-heading">Altura</p>
             <p className="text-2xl font-black text-gray-900 font-heading">{stats.altura} <span className="text-sm font-normal text-gray-500">cm</span></p>
          </div>
          <div className="text-center border-r border-gray-100">
             <p className="text-gray-400 text-xs font-bold uppercase font-heading">Peso</p>
             <p className="text-2xl font-black text-gray-900 font-heading">{stats.peso} <span className="text-sm font-normal text-gray-500">kg</span></p>
          </div>
          <div className="text-center border-r border-gray-100">
             <p className="text-gray-400 text-xs font-bold uppercase font-heading">Edad</p>
             <p className="text-2xl font-black text-gray-900 font-heading">{edad}</p>
          </div>
          <div className="text-center">
             <p className="text-gray-400 text-xs font-bold uppercase font-heading">Pierna</p>
             <p className="text-2xl font-black text-[#FF4C4C] capitalize font-heading">{stats.pierna_dominante?.slice(0,3)}.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-brand hover:shadow-md transition-shadow">
          <p className="text-xs text-gray-400 font-bold uppercase font-heading">Goles Totales</p>
          <p className="text-3xl font-black text-gray-900 font-heading mt-1">{stats.goles}</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-brand hover:shadow-md transition-shadow">
          <p className="text-xs text-gray-400 font-bold uppercase font-heading">Media Goles/P</p>
          <p className="text-3xl font-black text-gray-900 font-heading mt-1">{mediaGoles}</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-brand hover:shadow-md transition-shadow">
          <p className="text-xs text-gray-400 font-bold uppercase font-heading">Titularidades</p>
          <p className="text-3xl font-black text-gray-900 font-heading mt-1">{stats.partidos_titular}</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-brand hover:shadow-md transition-shadow">
          <p className="text-xs text-gray-400 font-bold uppercase font-heading">Minutos</p>
          <p className="text-3xl font-black text-gray-900 font-heading mt-1">{stats.minutos_jugados}'</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h3 className="text-lg font-black italic font-heading text-gray-900">HISTORIAL DE PARTIDOS</h3>
          <span className="text-xs bg-white border border-gray-200 px-3 py-1 rounded-full text-gray-500 font-bold shadow-sm">Temp. 23/24</span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-xs uppercase text-gray-400 font-bold font-heading">
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
                <tr><td colSpan={7} className="p-10 text-center text-gray-400 italic">No hay partidos registrados aún.</td></tr>
              ) : (
                partidos.map((p) => (
                  <tr key={p.id} className="hover:bg-red-50/30 transition-colors group">
                    <td className="px-6 py-4 font-bold text-gray-400 group-hover:text-[#FF4C4C] transition-colors">J{p.jornada}</td>
                    <td className="px-6 py-4 font-bold text-gray-900">
                      {p.es_local ? (
                        <span className="flex items-center gap-2"><span className="text-xs opacity-50">🏠</span> {p.contrincante}</span>
                      ) : (
                        <span className="flex items-center gap-2"><span className="text-xs opacity-50">✈️</span> {p.contrincante}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1 rounded-md font-bold text-xs font-heading ${
                        p.goles_equipo_favor > p.goles_equipo_contra ? 'bg-green-100 text-green-700' :
                        p.goles_equipo_favor < p.goles_equipo_contra ? 'bg-red-100 text-red-700' : 
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {p.goles_equipo_favor} - {p.goles_equipo_contra}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center font-mono text-gray-600">{p.min_jugados}'</td>
                    <td className="px-6 py-4 text-center">
                      {p.goles > 0 ? <span className="font-bold text-[#FF4C4C] bg-red-50 px-2 py-1 rounded">⚽ {p.goles}</span> : <span className="text-gray-300">-</span>}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {p.asistencias > 0 ? <span className="font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">👟 {p.asistencias}</span> : <span className="text-gray-300">-</span>}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {p.tarjeta_roja && <span className="inline-block w-3 h-4 bg-red-600 rounded-sm mr-1 shadow-sm"></span>}
                      {p.tarjeta_amarilla && <span className="inline-block w-3 h-4 bg-yellow-400 rounded-sm shadow-sm"></span>}
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