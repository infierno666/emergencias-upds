// app/page.tsx
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-neutral-100 text-neutral-900">
      <div className="border border-neutral-900 p-8 bg-white max-w-md w-full text-center">
        <h1 className="text-2xl font-bold tracking-tighter mb-2">
          SISTEMA DE EMERGENCIAS
        </h1>
        <p className="text-sm text-neutral-600">
          Infraestructura base inicializada correctamente.
        </p>
      </div>
    </main>
  );
}