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

    if (data.success) {
      alert(`Bienvenido, ${data.nombre}`);
      
      // Lógica de redirección según el rol
      if (data.rol === 'admin') {
        router.push('/admin/dashboard'); // (Aún no creada)
      } else {
        router.push('/cliente/entrenamientos'); // (Aún no creada)
      }
    } else {
      alert('Error: ' + data.error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Iniciar Sesión</h2>
        <input 
          type="email" placeholder="Email" className="w-full p-2 border mb-4 rounded"
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
        <input 
          type="password" placeholder="Contraseña" className="w-full p-2 border mb-4 rounded"
          onChange={(e) => setFormData({...formData, password: e.target.value})}
        />
        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded font-bold">Entrar</button>
        <p className="mt-4 text-sm text-center">
          ¿No tienes cuenta? <Link href="/registro" className="text-blue-500">Regístrate aquí</Link>
        </p>
      </form>
    </div>
  );
}