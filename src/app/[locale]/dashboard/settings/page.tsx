// Mock user settings
const mockUserSettings = {
  language: 'es',
  theme: 'dark',
  notifications: {
    email: true,
  },
};

export function generateStaticParams() {
  return [
    { locale: 'es' },
    { locale: 'en' },
    { locale: 'pt' },
  ];
}

export default function SettingsPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale;

  const t = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      es: {
        settings: 'Ajustes',
        language: 'Idioma',
        theme: 'Tema',
        notifications: 'Notificaciones',
        emailNotifications: 'Notificaciones por correo electrónico',
        saveChanges: 'Guardar cambios',
        dark: 'Oscuro',
        light: 'Claro',
        robloxClassic: 'Clásico Roblox',
        custom: 'Personalizado',
        es: 'Español',
        en: 'Inglés',
        pt: 'Português',
      },
      en: {
        settings: 'Settings',
        language: 'Language',
        theme: 'Theme',
        notifications: 'Notifications',
        emailNotifications: 'Email Notifications',
        saveChanges: 'Save Changes',
        dark: 'Dark',
        light: 'Light',
        robloxClassic: 'Roblox Classic',
        custom: 'Custom',
        es: 'Spanish',
        en: 'English',
        pt: 'Portuguese',
      },
      pt: {
        settings: 'Configurações',
        language: 'Idioma',
        theme: 'Tema',
        notifications: 'Notificações',
        emailNotifications: 'Notificações por e-mail',
        saveChanges: 'Guardar alterações',
        dark: 'Escuro',
        light: 'Claro',
        robloxClassic: 'Clássico Roblox',
        custom: 'Personalizado',
        es: 'Espanhol',
        en: 'Inglês',
        pt: 'Português',
      },
    };
    return (translations[locale] ?? {})[key] ?? key;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    // In a real app, we would update the settings via an API or context
    console.log('Setting changed:', e.target.name, e.target.value);
    alert('Configuración guardada (en una app real se guardaría en la backend)');
  };

  const handleSave = () => {
    alert('Configuración guardada (en una app real se guardaría en la backend)');
  };

  return (
    <div className="min-h-screen bg-bg-dark text-text-primary p-6">
      <h1 className="mb-6 text-3xl font-bold">{t('settings')}</h1>
      <div className="space-y-8">
        <div className="bg-bg-card rounded-xl p-6">
          <h2 className="mb-4 text-xl font-semibold">{t('language')}</h2>
          <div className="space-y-4">
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="language"
                value="es"
                checked={mockUserSettings.language === 'es'}
                onChange={handleChange}
                className="h-4 w-4 text-accent"
              />
              <span>{t('es')}</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="language"
                value="en"
                checked={mockUserSettings.language === 'en'}
                onChange={handleChange}
                className="h-4 w-4 text-accent"
              />
              <span>{t('en')}</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="language"
                value="pt"
                checked={mockUserSettings.language === 'pt'}
                onChange={handleChange}
                className="h-4 w-4 text-accent"
              />
              <span>{t('pt')}</span>
            </label>
          </div>
        </div>

        <div className="bg-bg-card rounded-xl p-6">
          <h2 className="mb-4 text-xl font-semibold">{t('theme')}</h2>
          <div className="space-y-4">
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="theme"
                value="dark"
                checked={mockUserSettings.theme === 'dark'}
                onChange={handleChange}
                className="h-4 w-4 text-accent"
              />
              <span>{t('dark')}</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="theme"
                value="light"
                checked={mockUserSettings.theme === 'light'}
                onChange={handleChange}
                className="h-4 w-4 text-accent"
              />
              <span>{t('light')}</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="theme"
                value="roblox-classic"
                checked={mockUserSettings.theme === 'roblox-classic'}
                onChange={handleChange}
                className="h-4 w-4 text-accent"
              />
              <span>{t('robloxClassic')}</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="theme"
                value="custom"
                checked={mockUserSettings.theme === 'custom'}
                onChange={handleChange}
                className="h-4 w-4 text-accent"
              />
              <span>{t('custom')}</span>
            </label>
          </div>
        </div>

        <div className="bg-bg-card rounded-xl p-6">
          <h2 className="mb-4 text-xl font-semibold">{t('notifications')}</h2>
          <div className="space-y-4">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="emailNotifications"
                checked={mockUserSettings.notifications.email}
                onChange={handleChange}
                className="h-4 w-4 text-accent"
              />
              <span>{t('emailNotifications')}</span>
            </label>
          </div>
        </div>

        <div className="bg-bg-card rounded-xl p-6">
          <button
            onClick={handleSave}
            className="w-full px-6 py-3 bg-accent hover:bg-accent-light rounded-xl text-text-primary transition-colors"
          >
            {t('saveChanges')}
          </button>
        </div>
      </div>
    </div>
  );
}
