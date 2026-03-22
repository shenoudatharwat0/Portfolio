import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface SeoConfig {
  title: string;
  description: string;
  image?: string;
  route?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  meta = inject(Meta);
  title = inject(Title);

  private readonly siteName = 'Shenouda Tharwat | Full-Stack Developer';

  updateMetadata(config: SeoConfig) {
    const fullTitle = `${config.title} | ${this.siteName}`;
    this.title.setTitle(fullTitle);

    this.meta.updateTag({ name: 'description', content: config.description });

    // OpenGraph Tags
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    if (config.route) {
      this.meta.updateTag({ property: 'og:url', content: `https://shenouda.dev${config.route}` });
    }
    if (config.image) {
      this.meta.updateTag({ property: 'og:image', content: config.image });
    }

    // Twitter Card
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: config.description });
    if (config.image) {
      this.meta.updateTag({ name: 'twitter:image', content: config.image });
    }
  }

  initDefaultMetadata() {
    this.updateMetadata({
      title: 'Portfolio',
      description: 'Shenouda Tharwat - Full-Stack .NET & Angular Developer crafting scalable, high-performance web applications with stunning glassmorphism UI.',
      image: 'https://avatars.githubusercontent.com/u/108503837?v=4',
      route: '/'
    });
  }
}
