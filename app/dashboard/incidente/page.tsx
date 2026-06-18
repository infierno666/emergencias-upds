import Link from 'next/link'
import { getIncidentById, getUserProfile } from '@/lib/supabase/queries'
import { createClient } from '@/lib/supabase/server'
import { updateIncident } from './actions'

export default async function DetalleIncidentePage({
  params,
  searchParams
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ error?: string }>
}) {
  const { id } = await params
  const { error } = await searchParams

  const incident = await getIncidentById(id)
  const profile = await getUserProfile()

  const isCoordinador = profile?.role === 'coordinador'

  let perfiles: any[] = []
  if (isCoordinador) {
    const supabase = await createClient()
    const { data } = await supabase.from('profiles').select('id, full_name').order('full_name')
    perfiles = data || []
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="border-b border-black pb-4 flex justify-between items-center">
        <h1 className="text-xl font-bold font-mono uppercase">
          Detalle del Incidente
        </h1>
        <Link href="/dashboard" className="text-sm font-mono underline hover:text-neutral-600">
          ← Volver al Tablero
        </Link>
      </div>

      <div className="border border-black p-6 space-y-4 bg-neutral-50">
        <div className="grid grid-cols-2 gap-4 border-b border-black pb-4">
          <div>
            <p className="text-xs font-mono uppercase text-neutral-500">Estado Actual</p>
            <p className="font-bold uppercase">{incident.status}</p>
          </div>
          <div>
            <p className="text-xs font-mono uppercase text-neutral-500">Tipo</p>
            {/* @ts-ignore */}
            <p>{incident.type?.name || 'N/A'}</p>
          </div>
          <div>
            <p className="text-xs font-mono uppercase text-neutral-500">Ubicación</p>
            <p>{incident.location}</p>
          </div>
          <div>
            <p className="text-xs font-mono uppercase text-neutral-500">Reportado por</p>
            {/* @ts-ignore */}
            <p>{incident.creator?.full_name}</p>
          </div>
        </div>

        <div>
          <p className="text-xs font-mono uppercase text-neutral-500 mb-1">Título</p>
          <p className="font-medium text-lg">{incident.title}</p>
        </div>

        <div>
          <p className="text-xs font-mono uppercase text-neutral-500 mb-1">Descripción</p>
          <p className="text-sm whitespace-pre-wrap">{incident.description}</p>
        </div>
      </div>

      {isCoordinador && (
        <form action={updateIncident} className="border border-[#13326a] p-6 space-y-5">
          <h2 className="font-mono uppercase font-bold text-[#13326a]">Panel de Coordinación</h2>

          {error && (
            <p className="text-sm border border-red-500 text-red-700 bg-red-50 px-3 py-2 font-mono">
              {error}
            </p>
          )}

          <input type="hidden" name="id" value={incident.id} />

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="status" className="block text-xs font-mono uppercase">
                Cambiar Estado
              </label>
              <select
                id="status" name="status" defaultValue={incident.status}
                className="w-full border border-black px-3 py-2 outline-none focus:ring-2 focus:ring-[#13326a] bg-white"
              >
                <option value="pendiente">Pendiente</option>
                <option value="en_proceso">En Proceso</option>
                <option value="resuelto">Resuelto</option>
              </select>
            </div>

            <div className="space-y-1">
              <label htmlFor="assigned_to" className="block text-xs font-mono uppercase">
                Asignar Responsable
              </label>
              <select
                id="assigned_to" name="assigned_to" defaultValue={incident.assigned_to || ''}
                className="w-full border border-black px-3 py-2 outline-none focus:ring-2 focus:ring-[#13326a] bg-white"
              >
                <option value="">Sin asignar...</option>
                {perfiles.map((p) => (
                  <option key={p.id} value={p.id}>{p.full_name}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#13326a] text-white py-2 font-mono text-sm uppercase tracking-wider hover:bg-[#0f2754]"
          >
            Actualizar Incidente
          </button>
        </form>
      )}
    </div>
  )
}