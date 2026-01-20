export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 text-center bg-[url('https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center">
      <div className="bg-black/70 p-10 rounded-xl text-white">
        <h1 className="text-5xl font-bold mb-4">Lleva tu fútbol al siguiente nivel</h1>
        <p className="text-xl mb-6">Entrenamientos personalizados para profesionales y amateurs.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="p-4 bg-slate-800 rounded">🚀 Potencia</div>
          <div className="p-4 bg-slate-800 rounded">🧠 Táctica</div>
          <div className="p-4 bg-slate-800 rounded">⚡ Velocidad</div>
        </div>
      </div>
    </main>
  );
}