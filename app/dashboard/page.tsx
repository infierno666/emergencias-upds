import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { logout } from './actions'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, role')
    .eq('id', user.id)
    .single()

  return (
    <main className="min-h-screen bg-white px-6 py-10">
      <div className="max-w-2xl mx-auto border border-black">
        <div className="bg-[#13326a] px-6 py-3 flex items-center justify-between">
          <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-white">
            Sistema de Emergencias / Tablero
          </p>
          <form action={logout}>
            <h1 className="text-xl font-bold mb-2 text-black">Bienvenido, {profile?.full_name ?? user.email}</h1>
          </form>
        </div>
        <div className="px-6 py-8">
          <h1 className="text-xl font-bold mb-2">Bienvenido, {profile?.full_name ?? user.email}</h1>
          <p className="text-sm font-mono uppercase tracking-wider text-neutral-600">
            Rol: {profile?.role ?? 'operador'}
          </p>
        </div>
      </div>
    </main>
  )
}