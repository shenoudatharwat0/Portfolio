import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <app-particles></app-particles>
    <div class="loading-screen" *ngIf="isLoading">
      <div class="loader"></div>
    </div>
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
    <app-scroll-to-top></app-scroll-to-top>
    <app-chat-widget></app-chat-widget>
    <app-custom-cursor></app-custom-cursor>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
    }
    
    .loading-screen {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: var(--primary);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      transition: opacity 0.6s ease, visibility 0.6s ease;
    }
    
    .loader {
      width: 60px;
      height: 60px;
      border: 5px solid var(--glow);
      border-top-color: var(--highlight);
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `]
})
export class AppComponent {
  isLoading = true;

  constructor() {
    // Hide loading screen after initial load
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
  }
}
