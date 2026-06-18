import './globals.css';
import Header from '@/components/ui/Header';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="antialiased min-h-screen flex flex-col bg-upds-bg text-upds-text">

        <Header />

        <main className="flex-1 container mx-auto px-4 py-8">
          {children}
        </main>

        <footer className="border-t border-upds-border py-6 mt-auto text-center text-sm text-upds-text-light">
          UPDS.NET v.5.1 © 2026 - Desarrollado por la Universidad Privada Domingo Savio.
        </footer>
      </body>
    </html>
  );
}