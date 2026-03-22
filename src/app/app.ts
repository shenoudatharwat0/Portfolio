import { Component, signal, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar';
import { FooterComponent } from './components/footer/footer';
import { ParticlesComponent } from './components/particles/particles';
import { ScrollToTopComponent } from './components/scroll-to-top/scroll-to-top';
import { ChatWidgetComponent } from './components/chat-widget/chat-widget';
import { CustomCursorComponent } from './components/custom-cursor/custom-cursor';
import { SeoService } from './services/seo.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, ParticlesComponent, ScrollToTopComponent, ChatWidgetComponent, CustomCursorComponent],
  template: `
    <app-particles></app-particles>
    
    @if (isLoading()) {
      <div class="loading-screen">
        <div class="loader"></div>
      </div>
    }

    <app-navbar></app-navbar>
    
    <router-outlet></router-outlet>

    <app-footer></app-footer>
    <app-scroll-to-top></app-scroll-to-top>
    <app-chat-widget></app-chat-widget>
    <app-custom-cursor></app-custom-cursor>
  `
})
export class App implements OnInit {
  isLoading = signal(true);
  seoService = inject(SeoService);

  ngOnInit() {
    this.seoService.initDefaultMetadata();
    setTimeout(() => {
      this.isLoading.set(false);
    }, 800);
  }
}
