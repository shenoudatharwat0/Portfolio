import { Injectable, signal, computed, effect, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { translations } from './translations';

export type Language = 'en' | 'ar';

@Injectable({ providedIn: 'root' })
export class TranslationService {
  currentLang = signal<Language>('en');
  platformId = inject(PLATFORM_ID);
  
  t = computed(() => translations[this.currentLang()]);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const savedLang = localStorage.getItem('lang') as Language;
      if (savedLang && (savedLang === 'en' || savedLang === 'ar')) {
        this.currentLang.set(savedLang);
      }
    }

    effect(() => {
      const lang = this.currentLang();
      if (isPlatformBrowser(this.platformId)) {
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        localStorage.setItem('lang', lang);
      }
    });
  }

  toggleLanguage() {
    this.currentLang.update(l => l === 'en' ? 'ar' : 'en');
  }
}
