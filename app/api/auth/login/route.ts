import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { verifyPassword, createToken } from '@/lib/auth';
import { cookies } from 'next/headers'; 

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const { rows } = await sql`SELECT * FROM users WHERE email=${email}`;
    
    if (rows.length === 0) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 401 });
    }

    const usuario = rows[0];

    const esCorrecta = await verifyPassword(password, usuario.password);

    if (!esCorrecta) {
      return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 });
    }

    const token = await createToken({
      id: usuario.id,
      email: usuario.email,
      rol: usuario.rol,
      nombre: usuario.nombre
    });


    const cookieStore = await cookies();
    
    cookieStore.set('session_token', token, {
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7200, 
      path: '/',
    });

    return NextResponse.json({ 
      success: true, 
      rol: usuario.rol, 
      nombre: usuario.nombre, 
      email: usuario.email 
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error en el servidor' }, { status: 500 });
  }
}