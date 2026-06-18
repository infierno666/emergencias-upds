import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const rutaDestino = user ? '/dashboard' : '/login';
  const textoBoton = user ? 'IR AL TABLERO' : 'INICIAR SESIÓN';

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 bg-upds-bg">
      <div className="max-w-4xl w-full text-center">

        {/* Título Principal */}
        <h1 className="text-4xl md:text-5xl font-bold text-upds-text mb-6 tracking-tight">
          Sistema de Gestión de Emergencias
        </h1>

        {/* Descripción */}
        <p className="text-lg text-upds-text-light mb-10 max-w-2xl mx-auto leading-relaxed">
          Plataforma centralizada y exclusiva para el campus universitario. Permite el reporte, monitoreo y resolución de incidentes en tiempo real de manera eficiente.
        </p>

        {/* Botón Principal Sólido */}
        <Link
          href={rutaDestino}
          className="inline-block bg-upds-blue text-white font-bold text-sm tracking-wider uppercase py-3.5 px-12 rounded hover:bg-upds-blue-dark transition-colors shadow-sm"
        >
          {textoBoton}
        </Link>

        {/* Lista de características sin cuadros (Elegante y minimalista) */}
        <div className="mt-20 pt-8 border-t border-upds-border flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 text-sm text-upds-text-light font-medium uppercase tracking-wide">
          <div className="flex items-center gap-2">
            <span className="text-upds-blue">✓</span> Reporte Inmediato
          </div>
          <span className="hidden sm:block text-gray-300">|</span>
          <div className="flex items-center gap-2">
            <span className="text-upds-blue">✓</span> Seguimiento Activo
          </div>
          <span className="hidden sm:block text-gray-300">|</span>
          <div className="flex items-center gap-2">
            <span className="text-upds-blue">✓</span> Gestión Coordinada
          </div>
        </div>

      </div>
    </div>
  );
}