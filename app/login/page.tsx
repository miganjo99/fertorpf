'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false); // Añadido estado de carga

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Bloquear botón
    
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.success) {
      // Guardamos datos visuales (no sensibles) para el Navbar
      localStorage.setItem('usuario_activo', JSON.stringify(data));
      
      // Despachamos evento para que el Navbar se actualice al instante
      window.dispatchEvent(new Event('user-login'));
      
      // Next.js detectará la cookie automáticamente en la redirección
      if (data.rol === 'admin') {
        router.push('/admin/dashboard'); 
      } else {
        router.push('/cliente/entrenamientos'); 
      }
    } else {
      alert('Error: ' + data.error);
      setLoading(false); // Desbloquear botón si falla
    }
  };

  const inputClass = "w-full p-3 mb-4 border border-gray-300 rounded bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand";

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-96 border border-gray-100">
        
        <h2 className="text-2xl font-black italic font-heading mb-6 text-center text-gray-900 uppercase">Iniciar Sesión</h2>
        
        <input 
          type="email" placeholder="Email" className={inputClass}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
        <input 
          type="password" placeholder="Contraseña" className={inputClass}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
        />
        
        <button 
            type="submit" 
            disabled={loading}
            className={`w-full bg-[#FF4C4C] hover:bg-[#E03E3E] text-white font-bold font-heading uppercase tracking-widest p-4 mt-6 rounded-xl shadow-lg shadow-red-500/30 transition-all transform hover:scale-[1.02] ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? 'ENTRANDO...' : 'ENTRAR'}
        </button>
        
        <p className="mt-4 text-sm text-center text-gray-600">
          ¿No tienes cuenta? <Link href="/registro" className="text-blue-500 font-bold hover:underline">Regístrate aquí</Link>
        </p>
      </form>
    </div>
  );
}