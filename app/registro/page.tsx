'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Registro() {
  const router = useRouter();
  const [formData, setFormData] = useState({ nombre: '', email: '', password: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/auth/registro', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
    alert('Cuenta creada. Ahora inicia sesión.');
    router.push('/login');
  };

  const inputClass = "w-full p-3 mb-4 border border-gray-300 rounded bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500";

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-lg w-96">
        
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">Crear Cuenta</h2>
        
        <input 
          type="text" placeholder="Nombre completo" className={inputClass}
          onChange={(e) => setFormData({...formData, nombre: e.target.value})}
        />
        <input 
          type="email" placeholder="Email" className={inputClass}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
        <input 
          type="password" placeholder="Contraseña" className={inputClass}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
        />
        
        <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded font-bold transition-colors">
            Registrarse
        </button>
      </form>
    </div>
  );
}