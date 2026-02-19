import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#111827] text-gray-300 py-12 border-t border-gray-800 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-1">
            <div className="text-3xl font-black italic tracking-tighter font-heading mb-4 select-none">
              <span className="text-white">FP</span>
              <span className="text-[#FF4C4C]">online</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Llevando tu rendimiento físico y táctico al nivel profesional. Entrenamientos diseñados para futbolistas de élite.
            </p>

            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/fertorpf" 
                target="_blank" 
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#FF4C4C] hover:text-white transition-all transform hover:-translate-y-1"
                aria-label="Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold font-heading uppercase tracking-widest mb-6">Explorar</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="hover:text-[#FF4C4C] transition-colors">Inicio</Link></li>
              <li><Link href="/contacto" className="hover:text-[#FF4C4C] transition-colors">Contacto</Link></li>
              <li><Link href="/login" className="hover:text-[#FF4C4C] transition-colors">Iniciar Sesión</Link></li>
              <li><Link href="/registro" className="hover:text-[#FF4C4C] transition-colors">Registrarse</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold font-heading uppercase tracking-widest mb-6">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="#" className="hover:text-[#FF4C4C] transition-colors">Política de Privacidad</Link></li>
              <li><Link href="#" className="hover:text-[#FF4C4C] transition-colors">Términos y Condiciones</Link></li>
              <li><Link href="#" className="hover:text-[#FF4C4C] transition-colors">Cookies</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold font-heading uppercase tracking-widest mb-6">Contacto</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <span className="text-[#FF4C4C]">📧</span>
                <span>info@fertorpf.com</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FF4C4C]">📍</span>
                <span>Ontinyent, Valencia<br/>España</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; {currentYear} Fertor PF. Todos los derechos reservados.</p>
          <p className="mt-2 md:mt-0">
            Designed for <span className="text-white font-bold">Winners</span>
          </p>
        </div>
      </div>
    </footer>
  );
}