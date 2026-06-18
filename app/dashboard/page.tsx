import Link from 'next/link'
import { getIncidents } from '@/lib/supabase/queries'

export default async function DashboardPage() {
  const incidents = await getIncidents()

  return (
    <div className="max-w-6xl mx-auto space-y-6">

      {/* 1. Encabezado */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end border-b border-upds-border pb-3 mt-4 gap-4">
        <div className="flex items-baseline gap-2">
          <h1 className="text-2xl font-normal text-upds-text">
            Tablero
          </h1>
          <span className="text-sm text-upds-text-light">
            incidentes reportados
          </span>
        </div>

        {/* Breadcrumb e Íconos alineados a la derecha */}
        <div className="flex items-center gap-6">
          <div className="text-xs text-upds-text-light hidden md:flex items-center gap-2">
            <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-gray-400">Inicio</span>
            <span className="text-gray-300">&gt;</span>
            <span>Tablero de incidentes</span>
          </div>

          <Link
            href="/dashboard/nuevo"
            className="bg-emerald-600 border border-emerald-700 text-white px-5 py-2 text-sm hover:bg-emerald-700 transition-all shadow-md hover:shadow-lg rounded-[3px] font-semibold flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            Nuevo Reporte
          </Link>
        </div>
      </div>

      {/* 2. Contenedor Principal Blanco */}
      <div className="bg-white border border-upds-border shadow-sm rounded-sm overflow-hidden mb-10">

        {/* Título interno centrado */}
        <div className="text-center py-6 border-b border-upds-border bg-gray-50/30">
          <h2 className="text-sm font-semibold text-upds-text uppercase tracking-wide">
            INCIDENTES ACTIVOS EN "CAMPUS UNIVERSITARIO"
          </h2>
        </div>

        {/* 3. La Tabla Limpia */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-upds-border text-upds-text uppercase text-[11px] tracking-wider">
                <th className="py-4 px-6 font-semibold">Estado</th>
                <th className="py-4 px-6 font-semibold">Tipo</th>
                <th className="py-4 px-6 font-semibold">Título</th>
                <th className="py-4 px-6 font-semibold">Ubicación</th>
                <th className="py-4 px-6 font-semibold">Responsable</th>
                <th className="py-4 px-6 font-semibold text-center">Acción</th>
              </tr>
            </thead>
            <tbody className="text-upds-text">
              {incidents?.map((inc) => (
                <tr key={inc.id} className="border-b border-upds-border hover:bg-blue-50/40 transition-colors">
                  <td className="py-4 px-6 capitalize font-medium">
                    {inc.status}
                  </td>
                  <td className="py-4 px-6">
                    {/* @ts-ignore */}
                    {inc.type?.name || 'N/A'}
                  </td>
                  <td className="py-4 px-6 font-medium text-upds-text">
                    {inc.title}
                  </td>
                  <td className="py-4 px-6 text-upds-text-light">
                    {inc.location}
                  </td>
                  <td className="py-4 px-6 text-upds-text-light">
                    {/* @ts-ignore */}
                    {inc.assignee?.full_name || 'Pendiente'}
                  </td>

                  {/* Botón Gestionar mejorado con ícono de ojo (visualizar) */}
                  <td className="py-4 px-6 text-center">
                    <Link
                      href={`/dashboard/incidente/${inc.id}`}
                      className="bg-upds-blue text-white px-4 py-1.5 rounded-[3px] text-xs font-semibold hover:bg-upds-blue-dark transition-all inline-flex items-center gap-2 whitespace-nowrap shadow-sm hover:shadow"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Gestionar
                    </Link>
                  </td>
                </tr>
              ))}

              {/* Estado Vacío */}
              {(!incidents || incidents.length === 0) && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-upds-text-light bg-gray-50/50">
                    No hay incidentes registrados actualmente.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}