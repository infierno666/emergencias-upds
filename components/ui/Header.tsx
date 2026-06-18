import { createClient } from '@/lib/supabase/server';
import { logout } from '@/app/dashboard/actions';
import Link from 'next/link';

export default async function Header() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    let profile = null;
    if (user) {
        const { data } = await supabase
            .from('profiles')
            .select('full_name')
            .eq('id', user.id)
            .single();
        profile = data;
    }

    // Lógica para extraer las iniciales (Ej: Daniel Maldonado -> DM)
    const nombreMostrar = profile?.full_name || user?.email || 'Usuario';
    const iniciales = profile?.full_name
        ? profile.full_name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase()
        : nombreMostrar.substring(0, 2).toUpperCase();

    return (
        <header className="bg-upds-blue text-white shadow-md">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">

                {/* Logo UPDS */}
                <Link href="/" className="flex items-center space-x-4">
                    <div className="text-2xl font-bold tracking-tight">
                        UPDS<span className="text-blue-300 font-normal">online</span>
                    </div>
                    <div className="text-xs mt-1 opacity-80 hidden sm:block">
                        Sistema de Gestión de Emergencias
                    </div>
                </Link>

                {/* Navegación Dinámica */}
                {user ? (
                    <nav className="flex items-center space-x-6 text-sm">
                        <Link href="/" className="hover:text-blue-200 transition-colors">Inicio</Link>
                        <Link href="/dashboard" className="hover:text-blue-200 transition-colors">Tablero</Link>
                        <div className="flex items-center space-x-4 border-l border-blue-400 pl-6 ml-2">
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold">
                                    {iniciales}
                                </div>
                                <span className="hidden md:block font-medium">{nombreMostrar}</span>
                            </div>
                            <form action={logout}>
                                <button type="submit" className="text-xs font-bold text-red-200 hover:text-white transition-colors">
                                    SALIR
                                </button>
                            </form>
                        </div>
                    </nav>
                ) : (
                    <nav className="text-sm">
                        <Link href="/login" className="font-semibold hover:text-blue-200 transition-colors">
                            Iniciar Sesión
                        </Link>
                    </nav>
                )}
            </div>
        </header>
    );
}