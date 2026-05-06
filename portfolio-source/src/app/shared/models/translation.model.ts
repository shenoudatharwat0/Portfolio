export interface Translation {
  lang: string;
  direction: 'ltr' | 'rtl';
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  navigation: {
    home: string;
    about: string;
    projects: string;
    skills: string;
    services: string;
    contact: string;
  };
  home: {
    hero: {
      greeting: string;
      role: string;
      cta: string;
    };
    stats: {
      projects: string;
      experience: string;
      clients: string;
    };
  };
  about: {
    title: string;
    subtitle: string;
  };
  projects: {
    title: string;
    subtitle: string;
    filterAll: string;
    viewDetails: string;
    liveDemo: string;
    sourceCode: string;
  };
  skills: {
    title: string;
    subtitle: string;
  };
  contact: {
    title: string;
    subtitle: string;
    formTitle: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    sendButton: string;
  };
}

export type LanguageCode = 'en' | 'ar';
