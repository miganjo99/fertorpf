'use client';
import Link from 'next/link';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-slate-900 text-white flex flex-col hidden md:flex">
        <div className="p-6 text-2xl font-bold text-center border-b border-slate-700">
          ⚽ Panel Pro
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/cliente/entrenamientos" className="block p-3 rounded hover:bg-green-600 transition-colors bg-slate-800">
            📊 Resumen / Stats
          </Link>
          <Link href="#" className="block p-3 rounded hover:bg-slate-700 transition-colors text-gray-400 cursor-not-allowed">
            📅 Calendario (Pronto)
          </Link>
          <Link href="#" className="block p-3 rounded hover:bg-slate-700 transition-colors text-gray-400 cursor-not-allowed">
            🎥 Video Análisis (Pronto)
          </Link>
        </nav>
        <div className="p-4 border-t border-slate-700">
          <Link href="/" className="text-sm text-gray-400 hover:text-white">← Volver a Inicio</Link>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}