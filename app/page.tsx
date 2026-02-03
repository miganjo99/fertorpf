import Link from 'next/link';
import InstagramPost from './components/InstagramPost'; 

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      
      <main className="flex flex-col items-center justify-center min-h-[80vh] p-8 text-center bg-[url('https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center relative">
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 bg-black/40 backdrop-blur-sm p-10 rounded-xl text-white max-w-3xl border border-white/10">
          <h1 className="text-5xl font-bold mb-4 tracking-tight">Lleva tu fútbol al siguiente nivel</h1>
          <p className="text-xl mb-8 text-gray-200">Entrenamientos personalizados de alto rendimiento para profesionales y amateurs.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/registro" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-bold transition-transform hover:scale-105">
              Empezar Ahora
            </Link>
            <Link href="/contacto" className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition-transform hover:scale-105">
              Más Información
            </Link>
          </div>
        </div>
      </main>

      <section className="py-16 bg-white px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Nuestros Pilares</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-gray-50 rounded-xl shadow-sm border border-gray-100 text-center">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Potencia Física</h3>
              <p className="text-gray-600">Mejora tu resistencia y fuerza explosiva.</p>
            </div>
            <div className="p-8 bg-gray-50 rounded-xl shadow-sm border border-gray-100 text-center">
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Inteligencia Táctica</h3>
              <p className="text-gray-600">Aprende a leer el partido y tomar decisiones.</p>
            </div>
            <div className="p-8 bg-gray-50 rounded-xl shadow-sm border border-gray-100 text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Técnica Individual</h3>
              <p className="text-gray-600">Perfecciona tu control y finalización.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-100 flex flex-col items-center px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Síguenos en Instagram</h2>
        <p className="text-gray-500 mb-8">Últimas novedades y ejercicios</p>
        
        <InstagramPost />
        
        <a 
            href="https://www.instagram.com/fertorpf" 
            // href="https://www.instagram.com/p/DN3Yaxs2L5P/?igsh=MWpmNGc4NWtxcHl1bw==" 
            target="_blank"
            className="mt-8 text-blue-600 font-bold hover:underline"
          >
            Ver perfil completo &rarr;
          </a>
      </section>

    </div>
  );
}