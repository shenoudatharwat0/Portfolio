import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Meta, Title } from '@angular/platform-browser';

import { routes } from './app.routes';
import { SeoService } from './core/services/seo.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, 
      withComponentInputBinding(),
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })
    ),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    Meta,
    Title,
    SeoService
  ]
};

// Initialize SEO on app bootstrap
export function initializeApp(seoService: SeoService): () => Promise<void> {
  return () => {
    seoService.init();
    return Promise.resolve();
  };
}
