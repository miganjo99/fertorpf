'use client';
import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function FormularioPartido() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');
  const nombreJugador = searchParams.get('nombre');

  const [loading, setLoading] = useState(false);
  
  const [form, setForm] = useState({
    user_id: userId,
    jornada: '',
    contrincante: '',
    fecha: '',
    es_local: true,
    resultado: '',
    goles_equipo_favor: 0,
    goles_equipo_contra: 0,
    titular: true,
    min_jugados: 90,
    goles: 0,
    asistencias: 0,
    tarjeta_amarilla: false,
    tarjeta_roja: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch('/api/admin/nuevo-partido', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert('Partido guardado y estadísticas actualizadas correctamente.');
      router.push('/admin/dashboard');
    } else {
      alert('Error al guardar.');
      setLoading(false);
    }
  };

  const inputClass = "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF4C4C] focus:border-[#FF4C4C] outline-none transition-all";
  const labelClass = "block text-sm font-bold text-gray-700 mb-1 uppercase tracking-wide";

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 font-sans">
      <div className="bg-white p-8 rounded-xl shadow-2xl border-t-4 border-[#FF4C4C]">
        <h2 className="text-2xl font-black italic font-heading text-[#111827] mb-2">Nuevo Partido</h2>
        <p className="text-gray-500 mb-8">Registrando datos para: <span className="font-bold text-[#FF4C4C]">{nombreJugador}</span></p>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className={labelClass}>Jornada</label>
              <input type="number" required className={inputClass} placeholder="Ej: 5"
                onChange={e => setForm({...form, jornada: e.target.value})} />
            </div>
            <div>
              <label className={labelClass}>Rival</label>
              <input type="text" required className={inputClass} placeholder="Ej: Valencia Mestalla"
                onChange={e => setForm({...form, contrincante: e.target.value})} />
            </div>
            <div>
              <label className={labelClass}>Fecha</label>
              <input type="date" required className={inputClass}
                onChange={e => setForm({...form, fecha: e.target.value})} />
            </div>
          </div>

          <div className="flex gap-6 items-center bg-gray-50 p-4 rounded-lg">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="local" checked={form.es_local} onChange={() => setForm({...form, es_local: true})} />
              <span className="font-bold">🏠 Local</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="local" checked={!form.es_local} onChange={() => setForm({...form, es_local: false})} />
              <span className="font-bold">✈️ Visitante</span>
            </label>
          </div>

          <div className="grid grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg items-end">
            <div>
              <label className={`text-xs font-bold text-center block mb-1 ${form.es_local ? 'text-[#FF4C4C]' : 'text-gray-500'}`}>
                {form.es_local ? 'Goles Favor (Local)' : 'Goles Contra (Local)'}
              </label>
              <input 
                type="number" 
                className={inputClass} 
                min="0" 
                value={form.es_local ? form.goles_equipo_favor : form.goles_equipo_contra}
                onChange={e => {
                  const valor = parseInt(e.target.value) || 0;
                  setForm(prev => ({
                    ...prev, 
                    ...(form.es_local ? { goles_equipo_favor: valor } : { goles_equipo_contra: valor })
                  }));
                }} 
              />
            </div>
            
            <div className="flex items-center justify-center pb-3 font-bold text-xl">-</div>
            
            <div>
              <label className={`text-xs font-bold text-center block mb-1 ${!form.es_local ? 'text-[#FF4C4C]' : 'text-gray-500'}`}>
                {form.es_local ? 'Goles Contra (Visit)' : 'Goles Favor (Visit)'}
              </label>
              <input 
                type="number" 
                className={inputClass} 
                min="0"
                value={form.es_local ? form.goles_equipo_contra : form.goles_equipo_favor}
                onChange={e => {
                  const valor = parseInt(e.target.value) || 0;
                  setForm(prev => ({
                    ...prev,
                    ...(form.es_local ? { goles_equipo_contra: valor } : { goles_equipo_favor: valor })
                  }));
                }} 
              />
            </div>
          </div>

          <h3 className="font-heading font-bold text-lg pt-4 border-t">Rendimiento Individual</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className={labelClass}>Minutos</label>
              <input type="number" className={inputClass} value={form.min_jugados}
                onChange={e => setForm({...form, min_jugados: parseInt(e.target.value)})} />
            </div>
            <div>
              <label className={labelClass}>Goles</label>
              <input type="number" className={inputClass} min="0" value={form.goles}
                onChange={e => setForm({...form, goles: parseInt(e.target.value)})} />
            </div>
            <div>
              <label className={labelClass}>Asistencias</label>
              <input type="number" className={inputClass} min="0" value={form.asistencias}
                onChange={e => setForm({...form, asistencias: parseInt(e.target.value)})} />
            </div>
            <div className="flex flex-col justify-end">
               <label className="flex items-center gap-2 cursor-pointer mb-2">
                 <input type="checkbox" checked={form.titular} onChange={e => setForm({...form, titular: e.target.checked})} />
                 <span className="text-sm font-bold">Fue Titular</span>
               </label>
            </div>
          </div>

          <div className="flex gap-6 pt-2">
             <label className="flex items-center gap-2 cursor-pointer">
               <input type="checkbox" checked={form.tarjeta_amarilla} onChange={e => setForm({...form, tarjeta_amarilla: e.target.checked})} />
               <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded">Tarjeta Amarilla</span>
             </label>
             <label className="flex items-center gap-2 cursor-pointer">
               <input type="checkbox" checked={form.tarjeta_roja} onChange={e => setForm({...form, tarjeta_roja: e.target.checked})} />
               <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">Tarjeta Roja</span>
             </label>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full bg-[#FF4C4C] hover:bg-[#E03E3E] text-white font-bold font-heading uppercase tracking-widest p-4 rounded-xl shadow-lg transition-all ${loading ? 'opacity-50' : ''}`}
          >
            {loading ? 'Guardando y Actualizando Stats...' : 'Subir Partido'}
          </button>

        </form>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Cargando formulario...</div>}>
      <FormularioPartido />
    </Suspense>
  );
}