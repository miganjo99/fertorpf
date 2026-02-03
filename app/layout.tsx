import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; 
import './globals.css';
import Navbar from './components/Navbar';
import WhatsAppButton from './components/WhatsAppButton';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FertorPF - Entrenamientos',
  description: 'Entrenamientos personales para futbolistas',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-gray-100 text-gray-900`}>
        <Navbar />
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}