'use client';

const faqItems = [
  {
    question: '¿NexoAccManager es gratuito?',
    answer: 'Sí, ofrecemos un plan gratuito con 5 cuentas Roblox y funcionalidades básicas. Para acceder a más características, puedes actualizar a uno de nuestros planes de pago.',
  },
  {
    question: '¿Mis cookies de Roblox están seguras?',
    answer: 'Absolutamente. Tus cookies .ROBLOSECURITY nunca salen de tu PC. Utilizamos cifrado AES-256-GCM derivado del hardware para almacenarlas de forma local y segura.',
  },
  {
    question: '¿Puedo usar NexoAccManager en Mac o Linux?',
    answer: 'Actualmente NexoAccManager está disponible para Windows. Las versiones para macOS y Linux están en nuestro roadmap y serán lanzadas próximamente.',
  },
  {
    question: '¿Qué es el Server Browser?',
    answer: 'El Server Browser te permite buscar y unirte a servidores de Roblox directamente desde la aplicación, con filtros por región, ping y tipo de juego.',
  },
  {
    question: '¿Cómo funciona el Auto Cookie Refresh?',
    answer: 'Renueva automáticamente tu cookie .ROBLOSECURITY antes de que expire, manteniéndote conectado sin interrupciones ni necesidad de iniciar sesión manualmente.',
  },
  {
    question: '¿Ofrecen soporte técnico?',
    answer: 'Sí, todos nuestros planes incluyen soporte. El plan gratuito tiene soporte por Discord, mientras que los planes de pago incluyen soporte por email y prioritario según el nivel.',
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="relative py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Preguntas <span className="gradient-text">frecuentes</span>
        </h2>

        <div className="space-y-6">
          {faqItems.map((item, index) => (
            <div key={index} className="glass p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-semibold">{item.question}</h3>
                <button
                  className="text-primary hover:text-primary-dark transition-colors"
                  aria-label="Toggle answer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 transition-transform duration-200"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
              </div>
              <p className="text-text-secondary text-sm">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}