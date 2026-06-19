import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Pago cancelado - NexoAccManager',
  description: 'El pago ha sido cancelado',
}

export default function CancelPage() {
  return (
    <div className="min-h-screen bg-bg-dark text-text-primary p-6">
      <div className="max-w-2xl mx-auto py-12 text-center">
        <div className="mb-8">
          <div className="w-16 h-16 bg-warning/20 rounded-full flex items-center justify-center mb-4 mx-auto">
            <span className="text-warning text-2xl">✕</span>
          </div>
          <h1 className="text-3xl font-bold mb-4">
            Pago cancelado
          </h1>
          <p className="text-xl text-text-secondary mb-6">
            No se ha realizado ningún cargo en tu cuenta.
            Puedes continuar usando NexoAccManager con tu plan actual.
          </p>

          <div className="space-y-4">
            <div className="flex flex-col items-center">
              <span className="text-text-secondary">¿Qué puedes hacer ahora?</span>
              <div className="mt-2 text-left space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-text-secondary">→</span>
                  <span>Volver a la página principal y explorar los planes</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-text-secondary">→</span>
                  <span>Continuar con tu plan actual sin interrupciones</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-text-secondary">→</span>
                  <span>Descargar NexoAccManager gratis</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/es/pricing"
              className="px-6 py-3 bg-primary hover:bg-primary-dark rounded-lg text-white font-medium transition-colors"
            >
              Ver planes
            </Link>
            <Link
              href="/es/dashboard/download"
              className="px-6 py-3 bg-bg-surface hover:bg-bg-card rounded-lg text-text-primary font-medium transition-colors border border-border/50"
            >
              Descargar gratis
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}