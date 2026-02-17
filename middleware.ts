import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  // 1. Obtenemos la cookie del token
  const token = request.cookies.get('session_token')?.value;

  // 2. Definimos las rutas protegidas
  const path = request.nextUrl.pathname;
  const esRutaAdmin = path.startsWith('/admin');
  const esRutaCliente = path.startsWith('/cliente');

  // 3. Si no hay token o es inválido en rutas protegidas -> Login
  if (esRutaAdmin || esRutaCliente) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    const payload = await verifyToken(token);

    if (!payload) {
      // Token manipulado o caducado
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // 4. Protección por Roles (Opcional pero recomendado)
    // Si intenta entrar a admin pero es cliente -> echarlo
    if (esRutaAdmin && payload.rol !== 'admin') {
      return NextResponse.redirect(new URL('/cliente/entrenamientos', request.url));
    }
  }

  return NextResponse.next();
}

// Configuración: En qué rutas se ejecuta el middleware
export const config = {
  matcher: ['/admin/:path*', '/cliente/:path*'],
};