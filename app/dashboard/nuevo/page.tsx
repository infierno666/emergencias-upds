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
    <div className="max-w-2xl mx-auto">

      {/* 1. Encabezado Institucional */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end border-b border-upds-border pb-3 mb-6 gap-4">
        <div className="flex items-baseline gap-2">
          <h1 className="text-2xl font-normal text-upds-text">
            Reportar Emergencia
          </h1>
          <span className="text-sm text-upds-text-light">
            nuevo incidente
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

      {/* 2. Contenedor Principal Blanco */}
      <div className="bg-white border border-upds-border shadow-sm rounded-sm overflow-hidden">

        <div className="px-6 py-4 border-b border-upds-border bg-gray-50/50">
          <p className="text-sm text-upds-text-light">
            Complete los campos obligatorios para registrar la situación en la base de datos.
          </p>
        </div>

        <form action={createIncident} className="p-6 space-y-6">

          {/* Mensaje de Error con Ícono */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-[3px] text-sm flex items-start gap-3 shadow-sm">
              <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {/* Campo: Título */}
          <div className="space-y-1.5">
            <label htmlFor="title" className="block text-sm font-semibold text-gray-700">
              Título breve <span className="text-red-500">*</span>
            </label>
            <input
              id="title" name="title" type="text" required minLength={3} maxLength={120}
              className="w-full border border-gray-300 rounded-[3px] px-3 py-2.5 outline-none focus:border-upds-blue focus:ring-1 focus:ring-upds-blue text-gray-800 transition-colors shadow-sm"
              placeholder="Ej. Humo en el laboratorio 3"
            />
          </div>

          {/* Campo: Tipo de Incidente */}
          <div className="space-y-1.5">
            <label htmlFor="type_id" className="block text-sm font-semibold text-gray-700">
              Tipo de Incidente <span className="text-red-500">*</span>
            </label>
            <select
              id="type_id" name="type_id" required
              className="w-full border border-gray-300 rounded-[3px] px-3 py-2.5 outline-none focus:border-upds-blue focus:ring-1 focus:ring-upds-blue bg-white text-gray-800 transition-colors shadow-sm"
            >
              <option value="">Seleccione una categoría...</option>
              {types.map((t) => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>

          {/* Campo: Ubicación */}
          <div className="space-y-1.5">
            <label htmlFor="location" className="block text-sm font-semibold text-gray-700">
              Ubicación exacta <span className="text-red-500">*</span>
            </label>
            <input
              id="location" name="location" type="text" required minLength={2}
              className="w-full border border-gray-300 rounded-[3px] px-3 py-2.5 outline-none focus:border-upds-blue focus:ring-1 focus:ring-upds-blue text-gray-800 transition-colors shadow-sm"
              placeholder="Ej. Bloque A, Piso 2, Aula 204"
            />
          </div>

          {/* Campo: Descripción */}
          <div className="space-y-1.5">
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700">
              Descripción detallada <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description" name="description" required minLength={3} maxLength={1000} rows={5}
              className="w-full border border-gray-300 rounded-[3px] px-3 py-2.5 outline-none focus:border-upds-blue focus:ring-1 focus:ring-upds-blue text-gray-800 transition-colors shadow-sm resize-none"
              placeholder="Describa la situación de manera clara..."
            ></textarea>
          </div>

          {/* 3. Botones de Acción */}
          <div className="pt-4 border-t border-upds-border flex justify-end gap-3 mt-8">
            <Link
              href="/dashboard"
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-[3px] text-sm font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              className="bg-upds-blue text-white px-6 py-2.5 rounded-[3px] text-sm font-semibold hover:bg-upds-blue-dark transition-colors shadow-sm flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Enviar Reporte
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}