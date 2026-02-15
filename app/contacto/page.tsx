'use client';
import { useState, FormEvent } from 'react';

export default function Contacto() {
  const [enviando, setEnviando] = useState(false);
  
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    edad: '',
    equipo: '',
    categoria: '',
    posicion: '',
    interes: 'personal',
    mensaje: ''
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setEnviando(true);
    console.log('Datos a enviar:', formData);
    
    setTimeout(() => {
      alert('¡Mensaje enviado! Nos pondremos en contacto contigo pronto.');
      setEnviando(false);
    }, 1000);
  };

  const inputClass = "w-full p-3 mb-4 border border-gray-300 rounded bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500";

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl">
        
        <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Únete al Equipo</h2>
        <p className="text-gray-500 text-center mb-8">Cuéntanos sobre ti y tus objetivos deportivos.</p>

        <form onSubmit={handleSubmit}>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Nombre Completo</label>
              <input 
                required type="text" name="nombre" 
                className={inputClass}
                placeholder="Nombre"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Email</label>
              <input 
                required type="email" name="email" 
                className={inputClass}
                placeholder="tu@email.com"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Edad</label>
              <input 
                required type="number" name="edad" 
                className={inputClass}
                placeholder="Ej: 19"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Equipo Actual</label>
              <input 
                type="text" name="equipo" 
                className={inputClass}
                placeholder="Equipo"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Categoría</label>
              <select 
                name="categoria" 
                className={inputClass}
                onChange={handleChange}
              >
                <option value="">Selecciona tu categoría</option>
                <option value="benjamin">Benjamín</option>
                <option value="alevin">Alevín</option>
                <option value="infantil">Infantil</option>
                <option value="cadete">Cadete</option>
                <option value="juvenil">Juvenil</option>
                <option value="senior">Senior / Amateur</option>
                <option value="veterano">Veterano</option>
              </select>
            </div> */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Posición Principal</label>
              <select 
                name="posicion" 
                className={inputClass}
                onChange={handleChange}
              >
                <option value="">Selecciona tu posición</option>
                <option value="portero">Portero</option>
                <option value="defensa_central">Defensa Central</option>
                <option value="lateral">Lateral</option>
                <option value="mediocentro">Mediocentro</option>
                <option value="extremo">Extremo</option>
                <option value="delantero">Delantero</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Comentarios / Objetivos</label>
            <textarea 
              name="mensaje" rows={4}
              className={inputClass}
              placeholder="Cuéntanos brevemente qué te gustaría mejorar..."
              onChange={handleChange}
            ></textarea>
          </div>

          <button 
            type="submit" 
            disabled={enviando}
            className={`w-full text-white font-bold font-heading tracking-wide p-4 mt-4 rounded-xl shadow-lg shadow-red-500/20 transition-all transform ${
              enviando 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-[#FF4C4C] hover:bg-[#E03E3E] hover:scale-[1.02]'
            }`}
          >
            {enviando ? 'Enviando...' : 'Enviar Solicitud'}
          </button>

        </form>
      </div>
    </div>
  );
}