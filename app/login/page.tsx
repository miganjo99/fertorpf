'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
//     console.log(data);
// alert(JSON.stringify(data));
    if (data.success) {
      // alert(`Bienvenido, ${data.nombre}`);

      localStorage.setItem('usuario_activo', JSON.stringify(data));
      window.dispatchEvent(new Event('user-login'));
      
      if (data.rol === 'admin') {
        router.push('/admin/dashboard'); 
      } else {
        router.push('/cliente/entrenamientos'); 
      }
    } else {
      alert('Error: ' + data.error);
    }
  };

  const inputClass = "w-full p-3 mb-4 border border-gray-300 rounded bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500";

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-lg w-96">
        
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">Iniciar Sesión</h2>
        
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
            className="w-full bg-[#FF4C4C] hover:bg-[#E03E3E] text-white font-bold font-heading uppercase tracking-widest p-4 mt-6 rounded-xl shadow-lg shadow-red-500/30 transition-all transform hover:scale-[1.02]"
          >
            ENTRAR
        </button>
        
        
        <p className="mt-4 text-sm text-center text-gray-600">
          ¿No tienes cuenta? <Link href="/registro" className="text-blue-500 font-bold hover:underline">Regístrate aquí</Link>
        </p>
      </form>
    </div>
  );
}