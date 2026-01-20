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

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Crear Cuenta</h2>
        <input 
          type="text" placeholder="Nombre completo" className="w-full p-2 border mb-4 rounded"
          onChange={(e) => setFormData({...formData, nombre: e.target.value})}
        />
        <input 
          type="email" placeholder="Email" className="w-full p-2 border mb-4 rounded"
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
        <input 
          type="password" placeholder="Contraseña" className="w-full p-2 border mb-4 rounded"
          onChange={(e) => setFormData({...formData, password: e.target.value})}
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded font-bold">Registrarse</button>
      </form>
    </div>
  );
}   