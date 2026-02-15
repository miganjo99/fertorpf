import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google'; 
import './globals.css';
import Navbar from './components/Navbar';
import WhatsAppButton from './components/WhatsAppButton'; 

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-montserrat', 
  weight: ['400', '600', '700', '900'], 
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Fertor PF - Rendimiento Deportivo',
  description: 'Entrenamientos personales y preparación física para futbolistas.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="bg-gray-100 text-slate-900 font-sans antialiased">
        <Navbar />
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}