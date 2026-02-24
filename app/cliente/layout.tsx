'use client';
import Link from 'next/link';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      
      <aside className="w-72 bg-[#111827] text-white flex flex-col hidden md:flex shadow-2xl z-10">
        
        <div className="p-8 border-b border-gray-800 flex flex-col items-center">
          <div className="text-3xl font-black italic tracking-tighter font-heading select-none">
            <span className="text-white">FPF</span>
            <span className="text-[#FF4C4C]">online</span> 
          </div>
          <p className="text-xs text-gray-500 mt-2 font-bold tracking-widest uppercase">Panel Jugador</p>
        </div>

        <nav className="flex-1 p-6 space-y-3 font-sans">
          
          <Link 
            href="/cliente/entrenamientos" 
            className="flex items-center gap-3 p-4 rounded-xl bg-[#FF4C4C] text-white shadow-lg shadow-red-900/20 hover:bg-[#E03E3E] transition-all transform hover:scale-[1.02] font-bold"
          >
            <span className="text-xl">📊</span>
            <span>Resumen / Stats</span>
          </Link>

          <Link 
            href="#" 
            className="flex items-center gap-3 p-4 rounded-xl text-gray-500 hover:bg-gray-800 hover:text-gray-300 transition-colors cursor-not-allowed border border-transparent hover:border-gray-700"
          >
            <span className="text-xl grayscale opacity-50">📅</span>
            <span>Calendario (Pronto)</span>
          </Link>
          
          <Link 
            href="#" 
            className="flex items-center gap-3 p-4 rounded-xl text-gray-500 hover:bg-gray-800 hover:text-gray-300 transition-colors cursor-not-allowed border border-transparent hover:border-gray-700"
          >
            <span className="text-xl grayscale opacity-50">🎥</span>
            <span>Video Psicologia (Pronto)</span>
          </Link>
          <Link 
            href="#" 
            className="flex items-center gap-3 p-4 rounded-xl text-gray-500 hover:bg-gray-800 hover:text-gray-300 transition-colors cursor-not-allowed border border-transparent hover:border-gray-700"
          >
            <span className="text-xl grayscale opacity-50">🏃</span>
            <span>Tus entrenamientos (Pronto)</span>
          </Link>
        </nav>

        <div className="p-6 border-t border-gray-800 bg-[#0f1523]">
          <Link 
            href="/" 
            className="flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-[#FF4C4C] transition-colors font-bold group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span> Volver a Inicio
          </Link>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto bg-gray-50">
        <div className="max-w-7xl mx-auto">
           {children}
        </div>
      </main>
    </div>
  );
}