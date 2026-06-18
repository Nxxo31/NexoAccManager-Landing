'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-border/50 mt-24 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-text-secondary">
          <div>
            <h3 className="mb-4 font-semibold text-primary">NexoAccManager</h3>
            <p className="text-sm">El gestor de cuentas Roblox que los pros usan</p>
          </div>

          <div>
            <h4 className="mb-3 font-medium text-white">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="#features" className="hover:text-primary transition-colors">
                  Características
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="hover:text-primary transition-colors">
                  Precios
                </Link>
              </li>
              <li>
                <Link href="#faq" className="hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 font-medium text-white">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/terms" className="hover:text-primary transition-colors">
                  Términos de servicio
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-primary transition-colors">
                  Política de privacidad
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 font-medium text-white">Idioma</h4>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 rounded text-sm bg-primary/20 text-primary hover:bg-primary/30">
                🇪🇸 ES
              </button>
              <button className="px-3 py-1 rounded text-sm bg-primary/20 text-primary hover:bg-primary/30">
                🇬🇧 EN
              </button>
              <button className="px-3 py-1 rounded text-sm bg-primary/20 text-primary hover:bg-primary/30">
                🇵🇹 PT
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border/50 text-center text-xs">
          © {new Date().getFullYear()} NexoAccManager. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}