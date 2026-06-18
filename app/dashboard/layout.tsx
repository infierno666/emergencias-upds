export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* ESPACIO PARA EL DISEÑADOR: Aquí irá la barra de navegación */}

      <main className="p-6 max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  )
}