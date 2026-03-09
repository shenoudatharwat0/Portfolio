import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar';
import { FooterComponent } from './components/footer/footer';
import { ParticlesComponent } from './components/particles/particles';
import { ScrollToTopComponent } from './components/scroll-to-top/scroll-to-top';
import { ChatWidgetComponent } from './components/chat-widget/chat-widget';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, ParticlesComponent, ScrollToTopComponent, ChatWidgetComponent],
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
  `
})
export class App implements OnInit {
  isLoading = signal(true);

  ngOnInit() {
    setTimeout(() => {
      this.isLoading.set(false);
    }, 800);
  }
}
