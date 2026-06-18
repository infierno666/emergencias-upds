import Link from 'next/link'
import { getIncidents } from '@/lib/supabase/queries'

export default async function DashboardPage() {
  const incidents = await getIncidents()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-black pb-4">
        <h1 className="text-xl font-bold font-mono uppercase">
          Tablero de Incidentes
        </h1>
        <Link
          href="/dashboard/nuevo"
          className="bg-[#13326a] text-white px-4 py-2 text-sm font-mono uppercase hover:bg-[#0f2754]"
        >
          + Nuevo Reporte
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse border border-black text-sm">
          <thead className="bg-neutral-100 font-mono text-xs uppercase">
            <tr>
              <th className="border border-black p-3">Estado</th>
              <th className="border border-black p-3">Tipo</th>
              <th className="border border-black p-3">Título</th>
              <th className="border border-black p-3">Ubicación</th>
              <th className="border border-black p-3">Responsable</th>
              <th className="border border-black p-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {incidents?.map((inc) => (
              <tr key={inc.id} className="hover:bg-neutral-50">
                <td className="border border-black p-3 font-mono text-xs uppercase">
                  {inc.status}
                </td>
                <td className="border border-black p-3">
                  {/* @ts-ignore - Evitamos error de tipado por el join de Supabase */}
                  {inc.type?.name || 'N/A'}
                </td>
                <td className="border border-black p-3 font-medium">
                  {inc.title}
                </td>
                <td className="border border-black p-3">{inc.location}</td>
                <td className="border border-black p-3 text-neutral-600">
                  {/* @ts-ignore */}
                  {inc.assignee?.full_name || 'Sin asignar'}
                </td>
                <td className="border border-black p-3 text-center">
                  <Link
                    href={`/dashboard/incidente/${inc.id}`}
                    className="underline text-[#13326a] font-mono text-xs"
                  >
                    Gestionar
                  </Link>
                </td>
              </tr>
            ))}

            {(!incidents || incidents.length === 0) && (
              <tr>
                <td colSpan={6} className="border border-black p-6 text-center text-neutral-500 font-mono">
                  No hay incidentes registrados actualmente.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}