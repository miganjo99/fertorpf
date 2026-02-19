import Link from 'next/link';
import InstagramPost from './components/InstagramPost'; 

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      
        <main 
          className="flex flex-col items-center justify-center min-h-[85vh] p-6 text-center bg-cover bg-center relative"
          style={{ 
            backgroundImage: "url('/img/hero.png')" 
          }}
        >        
        <div className="absolute inset-0 bg-[#111827]/70"></div>

        <div className="relative z-10 max-w-4xl flex flex-col items-center">
          <span className="bg-brand text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 animate-fade-in-up">
            Rendimiento Profesional
          </span>

          <h1 className="text-5xl md:text-7xl font-black italic font-heading text-white mb-6 uppercase tracking-tighter leading-tight drop-shadow-lg">
            Lleva tu fútbol al <br/>
            <span className="text-brand">siguiente nivel</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-10 text-gray-200 font-light max-w-2xl mx-auto">
            Entrenamientos personalizados de alto rendimiento para futbolistas que no se conforman con el promedio.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <Link 
              href="/registro" 
              className="bg-[#FF4C4C] hover:bg-[#E03E3E] text-white px-8 py-4 rounded-xl font-bold font-heading uppercase tracking-wide hover:bg-brand-dark transition-all hover:scale-105 shadow-xl shadow-red-600/30"
            >
              Empezar Ahora
            </Link>
            <Link 
              href="/contacto" 
              className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-xl font-bold font-heading uppercase tracking-wide hover:bg-white hover:text-brand transition-all hover:scale-105"
            >
              Más Información
            </Link>
          </div>
        </div>
      </main>

      <section className="py-20 bg-gray-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-brand font-bold uppercase tracking-widest text-sm mb-2">Metodología FP Online</h2>
            <h3 className="text-4xl font-black italic font-heading text-[#111827] uppercase">Domina el Juego</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-white rounded-xl shadow-lg border border-transparent hover:border-brand transition-all duration-300 group hover:-translate-y-2">
              <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-3xl mb-6 text-brand group-hover:bg-brand group-hover:text-white transition-colors">
                🚀
              </div>
              <h3 className="text-xl font-black font-heading mb-3 text-[#111827] uppercase italic">Potencia Física</h3>
              <p className="text-gray-600 leading-relaxed">
                Mejora tu resistencia, fuerza explosiva y velocidad. Construye un cuerpo preparado para la élite.
              </p>
            </div>

            <div className="p-8 bg-white rounded-xl shadow-lg border border-transparent hover:border-brand transition-all duration-300 group hover:-translate-y-2">
              <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-3xl mb-6 text-brand group-hover:bg-brand group-hover:text-white transition-colors">
                🧠
              </div>
              <h3 className="text-xl font-black font-heading mb-3 text-[#111827] uppercase italic">Inteligencia Táctica</h3>
              <p className="text-gray-600 leading-relaxed">
                Aprende a leer el partido, anticiparte a las jugadas y tomar mejores decisiones bajo presión.
              </p>
            </div>

            <div className="p-8 bg-white rounded-xl shadow-lg border border-transparent hover:border-brand transition-all duration-300 group hover:-translate-y-2">
              <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-3xl mb-6 text-brand group-hover:bg-brand group-hover:text-white transition-colors">
                ⚡
              </div>
              <h3 className="text-xl font-black font-heading mb-3 text-[#111827] uppercase italic">Técnica Individual</h3>
              <p className="text-gray-600 leading-relaxed">
                Perfecciona tu control, pase y finalización con ejercicios específicos de transferencia al juego real.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#111827] flex flex-col items-center px-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#111827] via-brand to-[#111827]"></div>
        
        <div className="text-center mb-10 z-10">
          <h2 className="text-4xl font-black italic font-heading text-white uppercase mb-4">Únete a la Comunidad</h2>
          <p className="text-gray-400 max-w-xl mx-auto">Sigue a <span className="text-brand font-bold">@fertorpf</span> para ejercicios diarios, consejos de nutrición y motivación.</p>
        </div>
        
        <div className="z-10 w-full max-w-md">
           <InstagramPost />
        </div>
        
        <a 
            href="https://www.instagram.com/fertorpf" 
            target="_blank"
            className="mt-10 flex items-center gap-2 text-white font-bold font-heading uppercase tracking-wide border-b-2 border-brand pb-1 hover:text-brand transition-colors"
          >
            Ver perfil completo en Instagram &rarr;
          </a>
      </section>

    </div>
  );
}