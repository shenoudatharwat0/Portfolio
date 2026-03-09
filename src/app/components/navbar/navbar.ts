import { Component, inject, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslationService } from '../../services/translation.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav id="navbar" [class.scrolled]="isScrolled()">
        <div class="nav-container">
            <a routerLink="/" class="logo"><i class="fas fa-code"></i><span>{{ t().home.name }}</span></a>
            <ul class="nav-links" [class.active]="isMobileMenuOpen()">
                <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (click)="closeMenu()">{{ t().nav.home }}</a></li>
                <li><a routerLink="/about" routerLinkActive="active" (click)="closeMenu()">{{ t().nav.about }}</a></li>
                <li><a routerLink="/skills" routerLinkActive="active" (click)="closeMenu()">{{ t().nav.skills }}</a></li>
                <li><a routerLink="/projects" routerLinkActive="active" (click)="closeMenu()">{{ t().nav.projects }}</a></li>
                <li><a routerLink="/services" routerLinkActive="active" (click)="closeMenu()">{{ t().nav.services }}</a></li>
                <li><a routerLink="/contact" routerLinkActive="active" (click)="closeMenu()">{{ t().nav.contact }}</a></li>
            </ul>
            <div class="nav-buttons">
                <button class="lang-btn" (click)="toggleLang()">{{ t().nav.langBtn }}</button>
                <button class="theme-btn" aria-label="Toggle Theme" (click)="toggleTheme()">
                    @switch (theme.currentTheme()) {
                        @case ('light') {
                            <i class="fas fa-sun"></i>
                        }
                        @case ('blue') {
                            <i class="fas fa-moon"></i>
                        }
                        @default {
                            <i class="fas fa-bolt"></i>
                        }
                    }
                </button>
                <button class="hamburger" [class.active]="isMobileMenuOpen()" (click)="toggleMenu()">
                    @if (isMobileMenuOpen()) {
                        <i class="fas fa-times"></i>
                    } @else {
                        <i class="fas fa-bars"></i>
                    }
                </button>
            </div>
        </div>
    </nav>
  `,
  styles: [`
    .theme-btn {
        background: var(--card-bg);
        border: 1px solid var(--border);
        width: 36px;
        height: 36px;
        border-radius: 50%;
        color: var(--highlight);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: var(--transition);
        font-size: 1.1rem;
    }
    .theme-btn:hover {
        background: var(--highlight);
        color: white;
        transform: scale(1.1);
    }
  `]
})
export class NavbarComponent {
  ts = inject(TranslationService);
  theme = inject(ThemeService);
  platformId = inject(PLATFORM_ID);
  t = this.ts.t;
  
  isScrolled = signal(false);
  isMobileMenuOpen = signal(false);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('scroll', () => {
        this.isScrolled.set(window.scrollY > 50);
      });
    }
  }

  toggleLang() {
    this.ts.toggleLanguage();
  }

  toggleTheme() {
    this.theme.toggleTheme();
  }

  toggleMenu() {
    this.isMobileMenuOpen.update(v => !v);
  }

  closeMenu() {
    this.isMobileMenuOpen.set(false);
  }
}
