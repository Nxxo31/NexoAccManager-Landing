'use client';

import { useEffect, useRef, useState } from 'react';

const features = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    title: 'Cifrado AES-256-GCM',
    description: 'Tus cookies Roblox nunca salen del PC. Cifrado local derivado del hardware.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952a4.125 4.125 0 00-7.533-2.803M15 19.128v-.003s0-.001 0-.001M15 19.128l-.346.346a2.5 2.5 0 01-3.536-3.536l.346-.346M15 19.128l-3.536-3.536M15 19.128l.346.346a2.5 2.5 0 003.536-3.536l-.346-.346M20.25 6.375a2.25 2.25 0 01-2.25 2.25H18a2.5 2.5 0 00-2.5 2.5V12a2.5 2.5 0 002.5 2.5h.75a2.25 2.25 0 012.25 2.25v.003a1.125 1.125 0 01-1.125 1.125h-1.125c-.621 0-1.125-.504-1.125-1.125v-.125c0-.621.504-1.125 1.125-1.125H20.25" />
      </svg>
    ),
    title: 'Multi-Roblox',
    description: 'Lanza múltiples instancias de Roblox simultáneas sin conflictos.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.25 14.25h13.5m-16.5-5.25h19.5M8.25 9.75V12m0 0h7.5M8.25 12h.008v.008H8.25V12zm.375 0a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM12 3.75h.008v.008H12V3.75zm.375 0a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0z" />
      </svg>
    ),
    title: 'API REST local',
    description: 'Backend local en Fastify para gestionar cuentas y lanzamientos. Puerto 8080.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
      </svg>
    ),
    title: 'Import/Export',
    description: 'Migra tus cuentas fácilmente entre dispositivos con archivos JSON seguros.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.023 9.348h4.992v-.001M2.985 19.5h3.992M18.375 18.75l2.25 2.25m-11.25-2.25l-2.25 2.25M15 13.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Auto Cookie Refresh',
    description: 'Renueva tu cookie .ROBLOSECURITY automáticamente antes de que expire.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
      </svg>
    ),
    title: 'Server Browser',
    description: 'Encuentra y únete a servidores de Roblox directamente desde la app.',
  },
];

const comparisonData = [
  { feature: 'Stack', ram: 'WinForms C# (.NET)', nexo: 'Electron + React + TS' },
  { feature: 'Plataforma', ram: 'Solo Windows', nexo: 'Windows (Mac/Linux futuro)' },
  { feature: 'UI/UX', ram: 'UI básica de 2015', nexo: 'Design system moderno, glassmorphism' },
  { feature: 'Cifrado', ram: 'Básico', nexo: 'AES-256-GCM derivado del hardware' },
  { feature: 'Multi-Roblox', ram: 'Sí', nexo: 'Sí, mejor integrado' },
  { feature: 'Server Browser', ram: 'Lista básica', nexo: 'Con región, ping y filtros' },
  { feature: 'Soporte activo', ram: 'Abandonado', nexo: 'Soporte activo por SaaS' },
];

export default function Features() {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tableRef = useRef<HTMLDivElement>(null);
  const [tableVisible, setTableVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardRefs.current.indexOf(entry.target as HTMLDivElement);
            if (index !== -1) {
              setVisibleCards((prev) => new Set([...prev, index]));
            }
            if (entry.target === tableRef.current) {
              setTableVisible(true);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    if (tableRef.current) observer.observe(tableRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Todo lo que necesitas para{' '}
            <span className="text-primary">gestionar tus cuentas</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Deja atrás las herramientas obsoletas. NexoAccManager combina seguridad,
            rendimiento y diseño moderno en una sola plataforma.
          </p>
        </div>

        {/* Grid de features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              ref={(el) => { cardRefs.current[index] = el; }}
              className={`glass p-6 transition-all duration-700 ${
                visibleCards.has(index)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="text-primary mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-text-secondary text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Comparativa vs RAM */}
        <div ref={tableRef} className="glass p-8">
          <h3 className="text-2xl font-bold text-center mb-8">
            NexoAccManager vs <span className="text-text-secondary">Roblox Account Manager</span>
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-text-secondary font-medium">Característica</th>
                  <th className="text-left py-3 px-4 text-text-secondary font-medium">RAM Original</th>
                  <th className="text-left py-3 px-4 text-primary font-medium">NexoAccManager</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr
                    key={row.feature}
                    className={`border-b border-white/5 transition-all duration-500 ${
                      tableVisible
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 -translate-x-4'
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <td className="py-3 px-4 font-medium">{row.feature}</td>
                    <td className="py-3 px-4 text-text-secondary">{row.ram}</td>
                    <td className="py-3 px-4 text-green-400">{row.nexo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
