import Link from 'next/link'
import { login } from './actions'

export default async function LoginPage({
    searchParams,
}: {
    searchParams: Promise<{ error?: string }>
}) {
    const { error } = await searchParams

    return (
        <main className="min-h-screen flex items-center justify-center bg-upds-bg px-4 relative overflow-hidden">
            {/* Efecto de fondo difuminado sutil */}
            <div className="absolute inset-0 z-0 flex justify-center items-center pointer-events-none">
                <div className="w-[500px] h-[500px] bg-upds-blue rounded-full blur-[100px] opacity-10"></div>
            </div>

            <div className="w-full max-w-sm bg-white rounded-xl shadow-lg overflow-hidden z-10 border border-upds-border">
                <div className="bg-upds-blue px-6 py-4 text-center">
                    <p className="text-xs font-semibold tracking-wider text-white uppercase opacity-95">
                        Sistema de Emergencias
                    </p>
                </div>

                <form action={login} className="px-6 py-8 space-y-5">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-800 text-center">
                        Iniciar Sesión
                    </h1>

                    {error && (
                        <div className="bg-red-50 text-red-600 text-sm border border-red-200 rounded-md px-4 py-3 text-center shadow-sm">
                            {error}
                        </div>
                    )}

                    <div className="space-y-1.5">
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                            Correo Institucional
                        </label>
                        <input id="email" name="email" type="email" required
                            className="w-full border border-upds-border rounded-md px-3 py-2.5 outline-none focus:ring-2 focus:ring-upds-blue/50 focus:border-upds-blue text-gray-800 transition-all shadow-sm"
                            placeholder="ejemplo@upds.edu.bo"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                            Contraseña
                        </label>
                        <input id="password" name="password" type="password" required
                            className="w-full border border-upds-border rounded-md px-3 py-2.5 outline-none focus:ring-2 focus:ring-upds-blue/50 focus:border-upds-blue text-gray-800 transition-all shadow-sm"
                            placeholder="••••••••"
                        />
                    </div>

                    <button type="submit"
                        className="w-full bg-upds-blue text-white font-bold py-2.5 rounded-md hover:bg-upds-blue-dark transition-colors shadow-md mt-2">
                        INGRESAR
                    </button>

                    <p className="text-sm text-center text-gray-500 pt-3">
                        ¿No tienes cuenta?{' '}
                        <Link href="/register" className="text-upds-blue font-bold hover:underline transition-all">
                            Regístrate
                        </Link>
                    </p>
                </form>
            </div>
        </main>
    )
}