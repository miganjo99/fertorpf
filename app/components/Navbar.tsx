'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<any>(null);

  useEffect(() => {
    const checkUser = () => {
      const datosGuardados = localStorage.getItem('usuario_activo');
      if (datosGuardados) {
        setUsuario(JSON.parse(datosGuardados));
      } else {
        setUsuario(null);
        handleLogout();
      }
    };
    checkUser();
    window.addEventListener('user-login', checkUser);
    return () => window.removeEventListener('user-login', checkUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('usuario_activo');
    setUsuario(null);
    router.push('/login');
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-[#111827] text-white shadow-xl sticky top-0 z-50 border-b border-gray-800">
      
      <div className="text-2xl font-black italic tracking-tighter font-heading hover:opacity-90 transition-opacity">
        <Link href="/" className="flex items-center gap-1">
          <span className="text-white">FPF</span>
          <span className="text-[#FF4C4C]">online</span>
        </Link>
      </div>
      
      <div className="flex items-center gap-8 font-sans font-medium text-sm">
        <Link href="/" className="hover:text-[#FF4C4C] transition-colors tracking-wide">Inicio</Link>
        <Link href="/contacto" className="hover:text-[#FF4C4C] transition-colors tracking-wide">Contacto</Link>

        {usuario ? (
          <>
            <div className="flex items-center gap-4 pl-4 border-l border-gray-700">
              
              {usuario.rol === 'cliente' && (
                <Link 
                  href="/cliente/entrenamientos" 
                  className="flex items-center gap-2 text-[#FF4C4C] border border-brand px-4 py-2 rounded-xl font-bold font-heading hover:bg-brand hover:text-white transition-all"
                >
                  📊 <span className="hidden sm:inline">Mis Stats</span>
                </Link>
              )}

              {usuario.rol === 'admin' && (
                <Link 
                  href="/admin/dashboard" 
                  className="flex items-center gap-2 text-white border border-white/20 px-4 py-2 rounded-xl font-bold font-heading hover:bg-white hover:text-black transition-all"
                >
                  ⚙️ <span className="hidden sm:inline">Admin</span>
                </Link>
              )}

              <div className="flex items-center gap-4">
                <span className="text-xs text-gray-400 hidden md:block font-bold">
                  Hola, <span className="text-white">{usuario.nombre}</span>
                </span>

                <button 
                  onClick={handleLogout} 
                  className="text-xs text-gray-400 hover:text-white underline decoration-gray-600 hover:decoration-white underline-offset-4 transition-all"
                >
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </>
        ) : (
          <Link 
            href="/login" 
            className="bg-[#FF4C4C] hover:bg-[#E03E3E] text-white px-6 py-2.5 rounded-xl font-bold font-heading hover:bg-brand-dark transition-transform hover:scale-105 shadow-lg shadow-red-900/20"
          >
            Iniciar Sesión
          </Link>
        )}
      </div>
    </nav>
  );
}