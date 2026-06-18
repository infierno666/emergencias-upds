import Link from 'next/link'
import { login } from './actions'

export default async function LoginPage({
    searchParams,
}: {
    searchParams: Promise<{ error?: string }>
}) {
    const { error } = await searchParams

    return (
        <main className="min-h-screen flex items-center justify-center bg-white px-4">
            <div className="w-full max-w-sm border border-black">
                <div className="bg-[#13326a] px-6 py-3">
                    <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-white">
                        Sistema de Emergencias / Acceso
                    </p>
                </div>

                <form action={login} className="px-6 py-8 space-y-5">
                    <h1 className="text-xl font-bold tracking-tight text-black">Iniciar sesión</h1>

                    {error && (
                        <p className="text-sm border border-black px-3 py-2 font-mono">{error}</p>
                    )}

                    <div className="space-y-1">
                        <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider">
                            Correo
                        </label>
                        <input id="email" name="email" type="email" required
                            className="w-full border border-black px-3 py-2 outline-none focus:ring-2 focus:ring-[#13326a] text-black"
                        />
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="password" className="block text-xs font-mono uppercase tracking-wider">
                            Contraseña
                        </label>
                        <input id="password" name="password" type="password" required
                            className="w-full border border-black px-3 py-2 outline-none focus:ring-2 focus:ring-[#13326a] text-black"
                        />
                    </div>

                    <button type="submit"
                        className="w-full bg-[#13326a] text-white py-2 font-mono text-sm uppercase tracking-wider hover:bg-[#0f2754]">

                        Entrar →
                    </button>

                    <p className="text-sm text-center text-neutral-600">
                        ¿No tienes cuenta?{' '}
                        <Link href="/register" className="underline">Regístrate</Link>
                    </p>
                </form>
            </div>
        </main>
    )
}