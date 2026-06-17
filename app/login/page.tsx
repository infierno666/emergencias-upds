'use client';

import { login, signup } from '@/actions/auth';


export default function LoginPage() {
    return (
        <main className="min-h-screen bg-neutral-100 flex items-center justify-center p-4">
            <form className="max-w-sm w-full bg-white border border-black p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-4 border-b border-black pb-2 text-black">
                    Acceso al Sistema
                </h2>

                <div className="mb-3">
                    <label className="block text-sm font-bold text-black mb-1">Correo (Email)</label>
                    <input type="email" name="email" required className="w-full border border-neutral-400 p-2 text-black outline-none focus:border-black" />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-bold text-black mb-1">Contraseña</label>
                    <input type="password" name="password" required minLength={6} className="w-full border border-neutral-400 p-2 text-black outline-none focus:border-black" />
                </div>

                <div className="flex gap-2">
                    <button formAction={login} className="w-full bg-black text-white font-bold py-2 hover:bg-neutral-800 transition-colors">
                        ENTRAR
                    </button>
                    <button formAction={signup} className="w-full bg-white text-black border border-black font-bold py-2 hover:bg-neutral-100 transition-colors">
                        REGISTRAR
                    </button>
                </div>
            </form>
        </main>
    );
}