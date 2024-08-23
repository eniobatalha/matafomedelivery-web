import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token') || localStorage.getItem('token');
    const { pathname } = request.nextUrl;

    // Define rotas que não precisam de autenticação
    const publicPaths = ['/login', '/register', '/forgot-password'];

    if (!token && !publicPaths.includes(pathname)) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Redireciona usuários logados para o dashboard se tentarem acessar páginas públicas
    if (token && publicPaths.includes(pathname)) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/dashboard/:path*', 
        '/cardapio/:path*', 
        '/pedidos/:path*', 
        '/payments/:path*',
        '/', // Para verificar a rota raiz
        '/login',
        '/register',
        '/forgot-password'
    ],
};
