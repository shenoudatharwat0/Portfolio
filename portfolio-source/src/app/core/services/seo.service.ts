import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

interface SeoData {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  type?: 'website' | 'article' | 'profile';
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);
  private readonly router = inject(Router);

  private readonly defaultSeo: SeoData = {
    title: 'Shenouda Tharwat | Full-Stack Developer',
    description: 'Full-Stack .NET & Angular Developer crafting scalable, high-performance web applications with stunning glassmorphism UI.',
    keywords: 'Angular, .NET, Full-Stack Developer, Web Development, TypeScript, C#',
    image: '/assets/images/og-image.jpg',
    type: 'profile'
  };

  init(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        // SEO updates happen in route data or components
      });
  }

  updateSeo(data: Partial<SeoData>): void {
    const seo = { ...this.defaultSeo, ...data };
    
    this.title.setTitle(seo.title);
    
    this.meta.updateTag({ name: 'description', content: seo.description });
    this.meta.updateTag({ name: 'keywords', content: seo.keywords || '' });
    
    // Open Graph
    this.meta.updateTag({ property: 'og:title', content: seo.title });
    this.meta.updateTag({ property: 'og:description', content: seo.description });
    this.meta.updateTag({ property: 'og:type', content: seo.type || 'website' });
    this.meta.updateTag({ property: 'og:image', content: seo.image || '' });
    
    // Twitter Card
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: seo.title });
    this.meta.updateTag({ name: 'twitter:description', content: seo.description });
    this.meta.updateTag({ name: 'twitter:image', content: seo.image || '' });
  }

  reset(): void {
    this.updateSeo({});
  }
}
