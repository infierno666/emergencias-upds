export default function Home() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="text-3xl font-bold text-upds-text mb-4">
        Bienvenido al Sistema de Emergencias
      </h1>
      <p className="text-upds-text-light mb-8 max-w-md">
        Plataforma centralizada para el reporte y seguimiento de incidentes dentro del campus universitario.
      </p>
      <a
        href="/login"
        className="bg-upds-blue text-white font-bold py-3 px-6 rounded-md hover:bg-upds-blue-dark transition-colors shadow-md"
      >
        INGRESAR AL SISTEMA
      </a>
    </div>
  );
}