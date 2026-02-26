'use client';
import { useEffect, useState } from 'react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, CartesianGrid 
} from 'recharts';

export default function ClienteDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [partidos, setPartidos] = useState<any[]>([]);
  const [atributos, setAtributos] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [partidoSeleccionado, setPartidoSeleccionado] = useState<any>(null);

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario_activo');
    const email = usuarioGuardado ? JSON.parse(usuarioGuardado).email : 'juan@gmail.com';

    Promise.all([
      fetch('/api/cliente/stats', { method: 'POST', body: JSON.stringify({ email }) }).then(r => r.json()),
      fetch('/api/cliente/partidos', { method: 'POST', body: JSON.stringify({ email }) }).then(r => r.json()),
      fetch('/api/cliente/atributos', { method: 'POST', body: JSON.stringify({ email }) }).then(r => r.json())
    ]).then(([dataStats, dataPartidos, dataAtributos]) => {
      setStats(dataStats);
      setPartidos(dataPartidos);
      setAtributos(dataAtributos); 
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="p-10 text-center text-gray-500 font-heading animate-pulse">Cargando perfil profesional...</div>;
  if (!stats) return <div className="p-10 text-center text-red-500">Error al cargar datos.</div>;

  const mediaGoles = stats.partidos_jugados > 0 ? (stats.goles / stats.partidos_jugados).toFixed(2) : 0;
  const edad = stats.fecha_nacimiento 
    ? new Date().getFullYear() - new Date(stats.fecha_nacimiento).getFullYear() 
    : '-';

  const formatearFecha = (fechaString: string) => {
    if (!fechaString) return '-';
    const opciones: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Date(fechaString).toLocaleDateString('es-ES', opciones);
  };

  const dataRadar = atributos ? [
    { subject: 'Velocidad', A: atributos.velocidad, fullMark: 100 },
    { subject: 'Fuerza', A: atributos.fuerza, fullMark: 100 },
    { subject: 'Resistencia', A: atributos.resistencia, fullMark: 100 },
    { subject: 'Técnica', A: atributos.tecnica, fullMark: 100 },
    { subject: 'Táctica', A: atributos.tactica, fullMark: 100 },
    { subject: 'Mentalidad', A: atributos.mentalidad, fullMark: 100 },
  ] : [];

  const ultimos5Partidos = partidos.slice(0, 5).reverse().map(p => ({
    name: `J${p.jornada}`,
    Minutos: p.min_jugados,
    Goles: p.goles
  }));

  return (
    <div className="space-y-8 font-sans relative">
      
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 flex flex-col items-center">
          <h3 className="text-lg font-black italic font-heading text-[#111827] w-full text-center uppercase tracking-wide mb-4">Perfil de Rendimiento</h3>
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={dataRadar}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#4b5563', fontSize: 12, fontWeight: 'bold' }} />
                <Radar name="Jugador" dataKey="A" stroke="#FF4C4C" strokeWidth={3} fill="#583232" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-lg font-black italic font-heading text-[#111827] uppercase tracking-wide mb-4 text-center">Carga Competitiva (Últimos 5 P.)</h3>
          <div className="w-full h-72">
            {ultimos5Partidos.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ultimos5Partidos} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <RechartsTooltip 
                    cursor={{ fill: '#f9fafb' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="Minutos" fill="#FF4C4C" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 italic">No hay partidos suficientes</div>
            )}
          </div>
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
                <th className="px-6 py-4">Fecha</th> 
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
                <tr><td colSpan={8} className="p-10 text-center text-gray-400 italic">No hay partidos registrados aún.</td></tr>
              ) : (
                partidos.map((p) => {
                  const golesIzquierda = p.es_local ? p.goles_equipo_favor : p.goles_equipo_contra;
                  const golesDerecha = p.es_local ? p.goles_equipo_contra : p.goles_equipo_favor;
                  
                  let bgColorClass = 'bg-gray-100 text-gray-600';
                  if (golesIzquierda > golesDerecha) bgColorClass = 'bg-green-100 text-green-700'; 
                  else if (golesIzquierda < golesDerecha) bgColorClass = 'bg-red-100 text-red-700'; 

                  return (
                    
                    <tr 
                      key={p.id} 
                      onClick={() => setPartidoSeleccionado(p)}
                      className="hover:bg-red-50/30 transition-colors group cursor-pointer"
                    >
                      <td className="px-6 py-4 font-bold text-gray-400 group-hover:text-[#FF4C4C] transition-colors">J{p.jornada}</td>
                      <td className="px-6 py-4 font-medium text-gray-500">{formatearFecha(p.fecha)}</td>
                      <td className="px-6 py-4 font-bold text-gray-900">
                        {p.es_local ? (
                          <span className="flex items-center gap-2"><span className="text-xs opacity-50">🏠</span> {p.contrincante}</span>
                        ) : (
                          <span className="flex items-center gap-2"><span className="text-xs opacity-50">✈️</span> {p.contrincante}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-3 py-1 rounded-md font-bold text-xs font-heading ${bgColorClass}`}>
                          {golesIzquierda} - {golesDerecha}
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
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {partidoSeleccionado && (
        <div 
          className="fixed inset-0 bg-[#111827]/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm transition-opacity"
          onClick={() => setPartidoSeleccionado(null)}
        >
          <div 
            className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-fade-in-up"
            onClick={(e) => e.stopPropagation()} 
          >
            <div className={`p-6 text-center text-white relative ${
              (partidoSeleccionado.es_local ? partidoSeleccionado.goles_equipo_favor : partidoSeleccionado.goles_equipo_contra) > 
              (partidoSeleccionado.es_local ? partidoSeleccionado.goles_equipo_contra : partidoSeleccionado.goles_equipo_favor) 
                ? 'bg-green-600' 
                : (partidoSeleccionado.es_local ? partidoSeleccionado.goles_equipo_favor : partidoSeleccionado.goles_equipo_contra) < 
                  (partidoSeleccionado.es_local ? partidoSeleccionado.goles_equipo_contra : partidoSeleccionado.goles_equipo_favor)
                  ? 'bg-red-600'
                  : 'bg-gray-800'
            }`}>
              <button 
                onClick={() => setPartidoSeleccionado(null)}
                className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
              >
                ✕
              </button>
              <p className="text-sm font-bold opacity-80 uppercase tracking-widest mb-1">
                Jornada {partidoSeleccionado.jornada}
              </p>
              <p className="text-xs opacity-70 mb-4">{formatearFecha(partidoSeleccionado.fecha)}</p>
              
              <div className="flex justify-between items-center px-4 font-heading font-black">
                <div className="w-1/3 text-right">
                  <span className="block text-xl md:text-2xl truncate">{stats.equipo}</span>
                  <span className="text-xs opacity-70 font-sans font-normal uppercase">{partidoSeleccionado.es_local ? 'Local' : 'Visitante'}</span>
                </div>
                <div className="w-1/3 text-4xl md:text-5xl tracking-tighter mx-2">
                  {partidoSeleccionado.es_local ? partidoSeleccionado.goles_equipo_favor : partidoSeleccionado.goles_equipo_contra} - {partidoSeleccionado.es_local ? partidoSeleccionado.goles_equipo_contra : partidoSeleccionado.goles_equipo_favor}
                </div>
                <div className="w-1/3 text-left">
                  <span className="block text-xl md:text-2xl truncate">{partidoSeleccionado.contrincante}</span>
                  <span className="text-xs opacity-70 font-sans font-normal uppercase">{partidoSeleccionado.es_local ? 'Visitante' : 'Local'}</span>
                </div>
              </div>
            </div>

            <div className="p-6">
              <h4 className="text-[#111827] font-black italic font-heading uppercase tracking-wide border-b pb-2 mb-4 text-center">Tu Rendimiento</h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-xl text-center">
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Minutos</p>
                  <p className="text-2xl font-black text-[#111827]">{partidoSeleccionado.min_jugados}'</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl text-center">
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Titular</p>
                  <p className={`text-xl font-black mt-1 ${partidoSeleccionado.titular ? 'text-green-600' : 'text-gray-400'}`}>
                    {partidoSeleccionado.titular ? 'SÍ ✅' : 'NO ❌'}
                  </p>
                </div>
                <div className="bg-red-50 p-4 rounded-xl text-center border border-red-100">
                  <p className="text-xs text-red-500 font-bold uppercase tracking-wider mb-1">Goles</p>
                  <p className="text-2xl font-black text-[#FF4C4C]">{partidoSeleccionado.goles}</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-xl text-center border border-blue-100">
                  <p className="text-xs text-blue-500 font-bold uppercase tracking-wider mb-1">Asistencias</p>
                  <p className="text-2xl font-black text-blue-600">{partidoSeleccionado.asistencias}</p>
                </div>
              </div>

              {(partidoSeleccionado.tarjeta_amarilla || partidoSeleccionado.tarjeta_roja) && (
                <div className="mt-4 flex justify-center gap-4 bg-gray-50 py-3 rounded-xl border border-gray-100">
                  {partidoSeleccionado.tarjeta_amarilla && (
                    <span className="flex items-center gap-2 text-sm font-bold text-gray-700">
                      <span className="w-4 h-5 bg-yellow-400 rounded-sm shadow-sm inline-block"></span> Amarilla
                    </span>
                  )}
                  {partidoSeleccionado.tarjeta_roja && (
                    <span className="flex items-center gap-2 text-sm font-bold text-gray-700">
                      <span className="w-4 h-5 bg-red-600 rounded-sm shadow-sm inline-block"></span> Roja
                    </span>
                  )}
                </div>
              )}

              <button 
                onClick={() => setPartidoSeleccionado(null)}
                className="mt-6 w-full bg-[#111827] text-white font-bold py-3 rounded-xl hover:bg-gray-800 transition-colors uppercase text-sm tracking-widest"
              >
                Cerrar Detalles
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}