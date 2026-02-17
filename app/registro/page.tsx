'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Registro() {
  const router = useRouter();
  const [formData, setFormData] = useState({ nombre: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert('¡Cuenta creada con éxito! Ahora inicia sesión.');
        router.push('/login');
      } else {
        setError(data.error || 'Hubo un error al registrarse.');
        setLoading(false);
      }
    } catch (err) {
      setError('Error de conexión. Inténtalo más tarde.');
      setLoading(false);
    }
  };

  const inputClass = "w-full p-4 mb-4 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all font-sans";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      
      <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        
        <div className="text-center mb-8">
           <h2 className="text-3xl font-black italic font-heading text-[#111827] uppercase tracking-tight mb-2">
             Únete al Equipo
           </h2>
           <p className="text-gray-500 text-sm">Crea tu cuenta para acceder al panel profesional.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded">
            <p className="font-bold">Error:</p>
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-2">
          
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">Nombre Completo</label>
            <input 
              type="text" 
              required
              placeholder="Nombre Completo " 
              className={inputClass}
              onChange={(e) => setFormData({...formData, nombre: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">Email</label>
            <input 
              type="email" 
              required
              placeholder="tu@email.com" 
              className={inputClass}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">Contraseña</label>
            <input 
              type="password" 
              required
              placeholder="••••••••" 
              className={inputClass}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className={`w-full bg-[#FF4C4C] hover:bg-[#E03E3E] text-white font-bold font-heading uppercase tracking-widest p-4 mt-6 rounded-xl shadow-lg shadow-red-500/30 transition-all transform hover:scale-[1.02] ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? 'CREANDO CUENTA...' : 'REGISTRARSE'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-600">
            ¿Ya tienes cuenta?{' '}
            <Link href="/login" className="text-[#FF4C4C] font-bold hover:underline decoration-2 underline-offset-4">
              Inicia Sesión aquí
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}