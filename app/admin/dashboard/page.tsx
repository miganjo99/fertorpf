'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [jugadores, setJugadores] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/admin/jugadores')
      .then(res => res.json())
      .then(data => setJugadores(data));
  }, []);

  const toggleEstado = async (id: number, estadoActual: boolean) => {
    const nuevoEstado = !estadoActual;
    const confirmacion = confirm(nuevoEstado ? "¿Reactivar jugador?" : "¿Cancelar suscripción de este jugador? Sus datos se mantendrán.");
    
    if (confirmacion) {
      await fetch('/api/admin/jugadores', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, activo: nuevoEstado }),
      });
      setJugadores(jugadores.map(j => j.id === id ? { ...j, activo: nuevoEstado } : j));
    }
  };

  return (
    <div className="p-8 font-sans">
      <h1 className="text-3xl font-black italic font-heading text-[#111827] uppercase mb-8">Panel de Entrenador</h1>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <table className="w-full text-left">
          <thead className="bg-[#111827] text-white uppercase text-xs font-bold font-heading">
            <tr>
              <th className="px-6 py-4">Jugador</th>
              <th className="px-6 py-4">Equipo</th>
              <th className="px-6 py-4 text-center">Estado</th>
              <th className="px-6 py-4 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {jugadores.map((jugador) => (
              <tr key={jugador.id} className={`hover:bg-gray-50 transition-colors ${!jugador.activo ? 'opacity-50 bg-gray-50' : ''}`}>
                <td className="px-6 py-4">
                  <p className="font-bold text-gray-900">{jugador.nombre}</p>
                  <p className="text-xs text-gray-500">{jugador.email}</p>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {jugador.equipo || '-'} <br/>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">{jugador.categoria || '-'}</span>
                </td>
                <td className="px-6 py-4 text-center">
                  {jugador.activo ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Activo
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      Inactivo
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 flex justify-center gap-3">
                  
                  <Link 
                    href={`/admin/partido?userId=${jugador.id}&nombre=${jugador.nombre}`}
                    className="bg-[#FF4C4C] hover:bg-[#E03E3E] text-white px-3 py-1.5 rounded-lg text-sm font-bold shadow-sm transition-colors"
                  >
                    + Partido
                  </Link>

                  <button 
                    onClick={() => toggleEstado(jugador.id, jugador.activo)}
                    className={`border px-3 py-1.5 rounded-lg text-sm font-bold transition-colors ${
                      jugador.activo 
                        ? 'border-gray-300 text-gray-500 hover:border-red-500 hover:text-red-500' 
                        : 'border-green-500 text-green-600 hover:bg-green-50'
                    }`}
                  >
                    {jugador.activo ? 'Desactivar' : 'Reactivar'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}