import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-bg-dark text-text-primary">
      <section className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-primary">
          El gestor de cuentas Roblox que los pros usan
        </h1>
        <p className="text-text-secondary max-w-2xl">
          Cifrado local AES-256-GCM, Multi-Roblox, API REST. Sin comprometer tus cookies.
        </p>
        <div className="flex flex-col sm:flex-row sm:space-x-4 justify-center">
          <Link href="/register" className="flex-1 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
            Empezar gratis
          </Link>
          <Link href="#features" className="flex-1 px-6 py-3 bg-border text-text-secondary hover:bg-bg-surface rounded-lg transition-colors">
            Ver características
          </Link>
        </div>
        {/* Mockup placeholder */}
        <div className="mt-10 w-full max-w-2xl bg-glass p-6 rounded-lg">
          <p className="italic text-text-secondary">Mockup de la app aquí</p>
        </div>
      </section>
    </main>
  );
}