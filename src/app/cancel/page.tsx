import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pago exitoso - NexoAccManager',
  description: 'Tu pago ha sido procesado exitosamente',
}

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-bg-dark text-text-primary p-6">
      <div className="max-w-2xl mx-auto py-12 text-center">
        <div className="mb-8">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
            <span className="text-green-500 text-2xl">✓</span>
          </div>
          <h1 className="text-3xl font-bold mb-4">
            ¡Pago exitoso!
          </h1>
          <p className="text-xl text-text-secondary mb-6">
            Tu suscripción ha sido activada correctamente. 
            Ahora puedes descargar NexoAccManager y comenzar a gestionar tus cuentas Roblox.
          </p>
          
          <div className="space-y-4">
            <div className="flex flex-col items-center">
              <span className="text-text-secondary">Tu cuenta está ahora activa con acceso completo a:</span>
              <div className="mt-2 text-left space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Todas las funciones premium desbloqueadas</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Actualizaciones y soporte prioritario</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Acceso inmediato a la descarga</span>
                </div>
              </div>
            </div>
          </div>
          
          <a 
            href="/es/dashboard/download" 
            className="mt-8 inline-block px-6 py-3 bg-primary hover:bg-primary-dark rounded-lg text-white font-medium transition-colors"
          >
            Descargar NexoAccManager
          </a>
        </div>
      </div>
    </div>
  )
}
