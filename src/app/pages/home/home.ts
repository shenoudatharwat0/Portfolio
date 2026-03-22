import { Component, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../services/translation.service';
import { TiltDirective } from '../../directives/tilt.directive';

@Component({
  selector: 'app-home',
  imports: [RouterLink, TiltDirective],
  template: `
    <section id="home" class="hero">
        <div class="container">
            <div class="hero-content">
                <div class="hero-text">
                    <h1>{{ t().home.name }}</h1>
                    <div class="subtitle-container">
                        <span class="subtitle">{{ currentRoleText() }}</span><span class="cursor"></span>
                    </div>
                    <p>{{ t().home.description }}</p>
                    <div class="cta-buttons">
                        <a routerLink="/projects" class="btn btn-primary"><i class="fas fa-briefcase"></i> {{ t().home.viewProjects }}</a>
                        <a routerLink="/contact" class="btn btn-secondary"><i class="fas fa-envelope"></i> {{ t().home.getInTouch }}</a>
                        <a href="assets/Files/CV.pdf" download class="btn btn-download"><i class="fas fa-download"></i> {{ t().home.downloadResume }}</a>
                    </div>
                </div>
                <div class="hero-image">
                    <div [appTilt]="20" style="padding: 30px; border-radius: 50%; display: inline-block;">
                        <div class="profile-container">
                            <img src="assets/images/profile/shenouda.png" alt="Shenouda Tharwat"  (error)="handleImageError($event)">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  `
})
export class HomeComponent implements OnInit, OnDestroy {
  ts = inject(TranslationService);
  t = this.ts.t;
  
  currentRoleText = signal('');
  private textIndex = 0;
  private charIndex = 0;
  private isDeleting = false;
  private timeoutId: ReturnType<typeof setTimeout> | undefined;

  ngOnInit() {
    this.type();
  }

  ngOnDestroy() {
    clearTimeout(this.timeoutId);
  }

  type = () => {
    const roles = this.t().home.roles;
    const currentText = roles[this.textIndex % roles.length];
    
    if (this.isDeleting) {
      this.currentRoleText.set(currentText.substring(0, this.charIndex - 1));
      this.charIndex--;
    } else {
      this.currentRoleText.set(currentText.substring(0, this.charIndex + 1));
      this.charIndex++;
    }

    let typeSpeed = this.isDeleting ? 50 : 100;

    if (!this.isDeleting && this.charIndex === currentText.length) {
      this.isDeleting = true;
      typeSpeed = 2000;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.textIndex++;
      typeSpeed = 500;
    }

    this.timeoutId = setTimeout(this.type, typeSpeed);
  }

  handleImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    const placeholderSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
        <defs>
          <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#0f172a" />
            <stop offset="100%" stop-color="#1e293b" />
          </linearGradient>
        </defs>
        <rect width="600" height="600" fill="url(#bg)" />
        <circle cx="300" cy="230" r="90" fill="#334155" />
        <rect x="170" y="340" width="260" height="160" rx="80" fill="#334155" />
        <text x="50%" y="90%" dominant-baseline="middle" text-anchor="middle"
          fill="#e2e8f0" font-size="28" font-family="Segoe UI, Arial, sans-serif">
          Shenouda Tharwat
        </text>
      </svg>
    `.trim();
    imgElement.src = `data:image/svg+xml;utf8,${encodeURIComponent(placeholderSvg)}`;
  }
}
