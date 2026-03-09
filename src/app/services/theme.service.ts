import { Injectable, signal, effect, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'jigar' | 'blue' | 'light';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  currentTheme = signal<Theme>('jigar');
  platformId = inject(PLATFORM_ID);

  themes: Theme[] = ['jigar', 'blue', 'light'];

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('theme') as Theme;
      if (savedTheme && this.themes.includes(savedTheme)) {
        this.currentTheme.set(savedTheme);
      }
    }

    effect(() => {
      if (isPlatformBrowser(this.platformId)) {
        const theme = this.currentTheme();
        
        // Remove all theme classes
        document.body.classList.remove('light-mode', 'blue-mode');
        
        // Add current theme class if not jigar (default)
        if (theme !== 'jigar') {
          document.body.classList.add(`${theme}-mode`);
        }
        
        localStorage.setItem('theme', theme);
      }
    });
  }

  toggleTheme() {
    const currentIndex = this.themes.indexOf(this.currentTheme());
    const nextIndex = (currentIndex + 1) % this.themes.length;
    this.currentTheme.set(this.themes[nextIndex]);
  }
  
  isDarkMode() {
    return this.currentTheme() !== 'light';
  }
}
