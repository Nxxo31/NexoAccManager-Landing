import type { ReactElement } from 'react';

// Mock data for download
const mockDownloadData = {
  version: 'v1.2.3',
  releaseDate: '2026-06-01',
};

export function generateStaticParams() {
  return [
    { locale: 'es' },
    { locale: 'en' },
    { locale: 'pt' },
  ];
}

export default function DownloadPage(params: { locale: string }): ReactElement {
  const { locale } = params;

  const t = (key: string): string | string[] => {
    const translations: Record<string, Record<string, string[] | string>> = {
      es: {
        download: 'Descarga',
        version: 'Versión',
        releaseDate: 'Fecha de lanzamiento',
        windows: 'Windows',
        macos: 'macOS',
        linux: 'Linux',
        downloadButton: 'Descargar',
        installation: 'Instalación',
        installationStepsWindows: [
          'Descargar el instalador .exe',
          'Ejecutar el instalador y seguir las instrucciones',
          'Iniciar NexoAccManager desde el menú de inicio',
        ],
        installationStepsMacos: [
          'Descargar el archivo .dmg',
          'Arrastrar NexoAccManager a la carpeta de Aplicaciones',
          'Iniciar NexoAccManager desde Launchpad',
        ],
        installationStepsLinux: [
          'Descargar el archivo .AppImage',
          'Dar permisos de ejecución: chmod +x NexoAccManager.AppImage',
          'Ejecutar: ./NexoAccManager.AppImage',
        ],
      },
      en: {
        download: 'Download',
        version: 'Version',
        releaseDate: 'Release Date',
        windows: 'Windows',
        macos: 'macOS',
        linux: 'Linux',
        downloadButton: 'Download',
        installation: 'Installation',
        installationStepsWindows: [
          'Download the .exe installer',
          'Run the installer and follow the instructions',
          'Launch NexoAccManager from the Start Menu',
        ],
        installationStepsMacos: [
          'Download the .dmg file',
          'Drag NexoAccManager to the Applications folder',
          'Launch NexoAccManager from Launchpad',
        ],
        installationStepsLinux: [
          'Download the .AppImage file',
          'Make it executable: chmod +x NexoAccManager.AppImage',
          'Run: ./NexoAccManager.AppImage',
        ],
      },
      pt: {
        download: 'Download',
        version: 'Versão',
        releaseDate: 'Data de lançamento',
        windows: 'Windows',
        macos: 'macOS',
        linux: 'Linux',
        downloadButton: 'Baixar',
        installation: 'Instalação',
        installationStepsWindows: [
          'Baixar o instalador .exe',
          'Executar o instalador e seguir as instruções',
          'Iniciar NexoAccManager no menu Iniciar',
        ],
        installationStepsMacos: [
          'Baixar el archivo .dmg',
          'Arrastrar NexoAccManager a la carpeta de Aplicaciones',
          'Iniciar NexoAccManager desde Launchpad',
        ],
        installationStepsLinux: [
          'Descargar el archivo .AppImage',
          'Dar permisos de ejecución: chmod +x NexoAccManager.AppImage',
          'Ejecutar: ./NexoAccManager.AppImage',
        ],
      },
    };
    return translations[locale]?.[key] ?? key;
  };

  return (
    <div className="min-h-screen bg-bg-dark text-text-primary p-6">
      <h1 className="mb-6 text-3xl font-bold">{t('download') as string}</h1>
      <div className="mb-8 bg-bg-card rounded-xl p-6">
        <h2 className="mb-4 text-xl font-semibold">{t('version') as string}</h2>
        <p className="mb-2">
          <span className="font-medium">{mockDownloadData.version}</span> -{' '}
          <span className="text-accent">{mockDownloadData.releaseDate}</span>
        </p>
        <a
          href="https://github.com/Nxxo31/NexoAccManager/releases/latest"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-accent hover:bg-accent-light rounded-xl text-text-primary transition-colors"
        >
          {t('downloadButton') as string}
        </a>
      </div>

      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">{t('installation') as string}</h2>
        <div className="space-y-6">
          <div className="bg-bg-card rounded-xl p-6">
            <h3 className="mb-4 text-lg font-semibold">{t('windows') as string}</h3>
            <ol className="list-decimal list-inside space-y-2">
              {((t('installationStepsWindows') as string[]) || []).map((step, index) => (
                <li key={index} className="text-sm">{step}</li>
              ))}
            </ol>
          </div>
          <div className="bg-bg-card rounded-xl p-6">
            <h3 className="mb-4 text-lg font-semibold">{t('macos') as string}</h3>
            <ol className="list-decimal list-inside space-y-2">
              {((t('installationStepsMacos') as string[]) || []).map((step, index) => (
                <li key={index} className="text-sm">{step}</li>
              ))}
            </ol>
          </div>
          <div className="bg-bg-card rounded-xl p-6">
            <h3 className="mb-4 text-lg font-semibold">{t('linux') as string}</h3>
            <ol className="list-decimal list-inside space-y-2">
              {((t('installationStepsLinux') as string[]) || []).map((step, index) => (
                <li key={index} className="text-sm">{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
