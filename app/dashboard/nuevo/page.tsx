import Link from 'next/link'
import { getIncidentTypes } from '@/lib/supabase/queries'
import { createIncident } from './actions'

export default async function NuevoIncidentePage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams
  const types = await getIncidentTypes()

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="border-b border-black pb-4 flex justify-between items-center">
        <h1 className="text-xl font-bold font-mono uppercase">
          Reportar Emergencia
        </h1>
        <Link href="/dashboard" className="text-sm font-mono underline hover:text-neutral-600">
          ← Volver
        </Link>
      </div>

      <form action={createIncident} className="space-y-5 border border-black p-6">
        {error && (
          <div className="bg-red-50 border border-red-500 text-red-700 px-4 py-2 text-sm font-mono">
            {error}
          </div>
        )}

        <div className="space-y-1">
          <label htmlFor="title" className="block text-xs font-mono uppercase">
            Título breve
          </label>
          <input
            id="title" name="title" type="text" required minLength={3} maxLength={120}
            className="w-full border border-black px-3 py-2 outline-none focus:ring-2 focus:ring-[#13326a]"
            placeholder="Ej. Humo en el laboratorio 3"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="type_id" className="block text-xs font-mono uppercase">
            Tipo de Incidente
          </label>
          <select
            id="type_id" name="type_id" required
            className="w-full border border-black px-3 py-2 outline-none focus:ring-2 focus:ring-[#13326a] bg-white"
          >
            <option value="">Seleccione un tipo...</option>
            {types.map((t) => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label htmlFor="location" className="block text-xs font-mono uppercase">
            Ubicación exacta
          </label>
          <input
            id="location" name="location" type="text" required minLength={2}
            className="w-full border border-black px-3 py-2 outline-none focus:ring-2 focus:ring-[#13326a]"
            placeholder="Ej. Bloque A, Piso 2, Aula 204"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="description" className="block text-xs font-mono uppercase">
            Descripción detallada
          </label>
          <textarea
            id="description" name="description" required minLength={3} maxLength={1000} rows={4}
            className="w-full border border-black px-3 py-2 outline-none focus:ring-2 focus:ring-[#13326a] resize-none"
            placeholder="Describa la situación y personas involucradas..."
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-[#13326a] text-white py-3 font-mono text-sm uppercase tracking-wider hover:bg-[#0f2754]"
        >
          Enviar Reporte
        </button>
      </form>
    </div>
  )
}