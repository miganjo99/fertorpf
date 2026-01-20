'use client';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-slate-900 text-white">
      <div className="text-xl font-bold">Fertorpf</div>
      <div className="flex gap-4">
        <Link href="/" className="hover:text-green-400">Inicio</Link>
        <Link href="/contacto" className="hover:text-green-400">Contacto</Link>
        <Link href="/login" className="bg-green-500 px-4 py-1 rounded text-black font-bold hover:bg-green-400">
          Iniciar Sesión
        </Link>
      </div>
    </nav>
  );
}