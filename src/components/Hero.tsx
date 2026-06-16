'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Hero() {
  const particleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = particleRef.current;
    if (!container) return;

    const particleCount = 20;
    const particles: HTMLDivElement[] = [];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      const size = Math.random() * 4 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDuration = `${Math.random() * 8 + 10}s`;
      particle.style.animationDelay = `${Math.random() * 5}s`;
      container.appendChild(particle);
      particles.push(particle);
    }

    return () => {
      particles.forEach((p) => p.remove());
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Fondo degradado */}
      <div className="hero-background" />

      {/* Partículas */}
      <div ref={particleRef} className="particle-field" />

      {/* Contenido principal */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
        <div className="space-y-8">
          {/* Badge */}
          <div className="hero-fade-in inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-text-secondary">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Disponible para Windows — Mac y Linux próximamente
          </div>

          {/* Headline */}
          <h1 className="hero-fade-in-delayed text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            <span className="gradient-text">
              El gestor de cuentas Roblox
            </span>
            <br />
            <span className="text-white">
              que los pros usan
            </span>
          </h1>

          {/* Subheadline */}
          <p className="hero-fade-in-delayed-2 text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Cifrado local AES-256-GCM, Multi-Roblox, API REST.
            <br />
            Sin comprometer tus cookies.
          </p>

          {/* CTAs */}
          <div className="hero-fade-in-delayed-2 flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/register" className="cta-primary">
              Empezar gratis
            </Link>
            <Link href="#features" className="cta-secondary">
              Ver características
            </Link>
          </div>

          {/* Stats rápidas */}
          <div className="hero-fade-in-delayed-2 flex flex-wrap justify-center gap-8 pt-8 text-text-secondary text-sm">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                ✓
              </span>
              100% gratuito para empezar
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                ✓
              </span>
              Sin tarjeta de crédito
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                ✓
              </span>
              Setup en 30 segundos
            </div>
          </div>
        </div>

        {/* Mockup de la app con glassmorphism */}
        <div className="mockup-container mt-16 mx-auto max-w-4xl">
          <div className="mockup-glass p-6 md:p-8">
            {/* Barra superior del mockup */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex-1 text-center text-xs text-text-secondary font-mono">
                NexoAccManager — v1.0.0
              </div>
            </div>

            {/* Contenido del mockup */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Sidebar */}
              <div className="md:col-span-1 space-y-3">
                <div className="h-10 bg-bg-card/50 rounded-lg flex items-center px-3 border border-white/5">
                  <div className="w-6 h-6 rounded-full bg-primary/20 mr-2" />
                  <div className="h-2 w-24 bg-text-secondary/20 rounded" />
                </div>
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="h-8 bg-bg-card/30 rounded-lg flex items-center px-3"
                  >
                    <div className="h-2 w-20 bg-text-secondary/10 rounded" />
                  </div>
                ))}
              </div>

              {/* Main content */}
              <div className="md:col-span-2 space-y-4">
                <div className="h-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg border border-white/5 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">5</div>
                    <div className="text-xs text-text-secondary">Cuentas activas</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="h-24 bg-bg-card/30 rounded-lg border border-white/5 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-lg font-semibold">Server Browser</div>
                      <div className="text-xs text-text-secondary">Buscar servers</div>
                    </div>
                  </div>
                  <div className="h-24 bg-bg-card/30 rounded-lg border border-white/5 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-lg font-semibold">Import/Export</div>
                      <div className="text-xs text-text-secondary">Migrar datos</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
