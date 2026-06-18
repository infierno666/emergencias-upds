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

  // Si es coordinador, necesitamos traer la lista de perfiles para asignar
  let perfiles: any[] = []
  if (isCoordinador) {
    const supabase = await createClient()
    const { data } = await supabase.from('profiles').select('id, full_name').order('full_name')
    perfiles = data || []
  }

  // Helper para los colores del estado
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pendiente': return 'bg-rose-100 text-rose-700 border-rose-200';
      case 'en_proceso': return 'bg-sky-100 text-sky-700 border-sky-200';
      case 'resuelto': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">

      {/* 1. Encabezado Institucional */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end border-b border-upds-border pb-3 mb-6 gap-4">
        <div className="flex items-baseline gap-2">
          <h1 className="text-2xl font-normal text-upds-text">
            Expediente del Incidente
          </h1>
          <span className="text-sm text-upds-text-light">
            #{incident.id.substring(0, 8)}
          </span>
        </div>

        <div className="mt-4 sm:mt-0">
          <Link
            href="/dashboard"
            className="text-sm text-upds-text-light hover:text-upds-blue transition-colors flex items-center gap-1 font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver al tablero
          </Link>
        </div>
      </div>

      {/* 2. Tarjeta de Información (Solo Lectura) */}
      <div className="bg-white border border-upds-border shadow-sm rounded-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-upds-border bg-gray-50/50 flex justify-between items-center">
          <h2 className="text-sm font-semibold text-upds-text uppercase tracking-wide">
            Detalles Generales
          </h2>
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getStatusColor(incident.status)}`}>
            {incident.status.replace('_', ' ')}
          </span>
        </div>

        <div className="p-6 space-y-6 text-upds-text">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-[11px] font-semibold text-upds-text-light uppercase tracking-wider mb-1">Tipo de Incidente</p>
              {/* @ts-ignore */}
              <p className="font-medium text-gray-800 bg-gray-50 px-3 py-2 rounded-sm border border-gray-100">{incident.type?.name || 'N/A'}</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-upds-text-light uppercase tracking-wider mb-1">Ubicación</p>
              <p className="font-medium text-gray-800 bg-gray-50 px-3 py-2 rounded-sm border border-gray-100">{incident.location}</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-upds-text-light uppercase tracking-wider mb-1">Reportado por</p>
              {/* @ts-ignore */}
              <p className="font-medium text-gray-800 bg-gray-50 px-3 py-2 rounded-sm border border-gray-100">{incident.creator?.full_name}</p>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6">
            <p className="text-[11px] font-semibold text-upds-text-light uppercase tracking-wider mb-1">Título del Reporte</p>
            <p className="font-medium text-lg text-gray-800">{incident.title}</p>
          </div>

          <div>
            <p className="text-[11px] font-semibold text-upds-text-light uppercase tracking-wider mb-1">Descripción de los hechos</p>
            <div className="bg-gray-50 border border-gray-100 p-4 rounded-sm text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
              {incident.description}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Panel de Gestión (Exclusivo para Coordinadores) */}
      {isCoordinador && (
        <div className="bg-white border-2 border-upds-blue/20 shadow-sm rounded-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-upds-blue/20 bg-blue-50/40 flex items-center gap-2">
            <svg className="w-5 h-5 text-upds-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <h2 className="text-sm font-bold text-upds-blue uppercase tracking-wide">
              Panel de Coordinación
            </h2>
          </div>

          <form action={updateIncident} className="p-6 space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-[3px] text-sm flex items-start gap-3 shadow-sm">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <input type="hidden" name="id" value={incident.id} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Actualización de Estado */}
              <div className="space-y-1.5">
                <label htmlFor="status" className="block text-sm font-semibold text-gray-700">
                  Actualizar Estado <span className="text-red-500">*</span>
                </label>
                <select
                  id="status" name="status" defaultValue={incident.status}
                  className="w-full border border-gray-300 rounded-[3px] px-3 py-2.5 outline-none focus:border-upds-blue focus:ring-1 focus:ring-upds-blue bg-white text-gray-800 transition-colors shadow-sm"
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="en_proceso">En Proceso</option>
                  <option value="resuelto">Resuelto</option>
                </select>
              </div>

              {/* Asignación de Responsable */}
              <div className="space-y-1.5">
                <label htmlFor="assigned_to" className="block text-sm font-semibold text-gray-700">
                  Asignar Responsable
                </label>
                <select
                  id="assigned_to" name="assigned_to" defaultValue={incident.assigned_to || ''}
                  className="w-full border border-gray-300 rounded-[3px] px-3 py-2.5 outline-none focus:border-upds-blue focus:ring-1 focus:ring-upds-blue bg-white text-gray-800 transition-colors shadow-sm"
                >
                  <option value="">Sin asignar...</option>
                  {perfiles.map((p) => (
                    <option key={p.id} value={p.id}>{p.full_name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="pt-4 mt-2 flex justify-end">
              <button
                type="submit"
                className="bg-upds-blue text-white px-6 py-2.5 rounded-[3px] text-sm font-semibold hover:bg-upds-blue-dark transition-colors shadow-sm flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Guardar Cambios
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}