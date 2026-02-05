'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<any>(null);

  useEffect(() => {
    const datosGuardados = localStorage.getItem('usuario_activo');
    if (datosGuardados) {
      setUsuario(JSON.parse(datosGuardados));
    }
  }, []);

  const handleLogout = () => {
    // Borramos los datos y recargamos
    localStorage.removeItem('usuario_activo');
    setUsuario(null);
    router.push('/login');
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-slate-900 text-white shadow-md">
      <div className="text-xl font-bold tracking-wider">
        <Link href="/">⚽ FutbolPro</Link>
      </div>
      
      <div className="flex items-center gap-6">
        <Link href="/" className="hover:text-green-400 transition-colors">Inicio</Link>
        <Link href="/contacto" className="hover:text-green-400 transition-colors">Contacto</Link>

        {usuario ? (
          <>
            {usuario.rol === 'cliente' && (
              <Link href="/cliente/entrenamientos" className="text-yellow-400 font-bold hover:text-yellow-300 border border-yellow-400 px-3 py-1 rounded">
                📊 Mis Stats
              </Link>
            )}

            {usuario.rol === 'admin' && (
              <Link href="/admin/dashboard" className="text-purple-400 font-bold hover:text-purple-300 border border-purple-400 px-3 py-1 rounded">
                ⚙️ Admin
              </Link>
            )}

            <div className="flex items-center gap-3 ml-4 border-l border-gray-700 pl-4">
              <span className="text-xs text-gray-400 hidden md:block">Hola, {usuario.nombre}</span>

              <button 
                onClick={handleLogout} 
                className="text-sm bg-red-600 hover:bg-red-700 px-3 py-1 rounded font-bold transition-colors"
              >
                Salir
              </button>
            </div>
          </>
        ) : (
          <Link href="/login" className="bg-green-500 px-4 py-2 rounded text-black font-bold hover:bg-green-400 transition-transform hover:scale-105">
            Iniciar Sesión
          </Link>
        )}
      </div>
    </nav>
  );
}