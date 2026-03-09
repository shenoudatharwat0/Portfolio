import { Component, inject } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-about',
  template: `
    <div class="page-container">
        <section id="about" class="fade-in visible">
            <div class="container">
                <div class="section-header">
                    <h2>{{ t().about.title }}</h2>
                    <p>{{ t().about.subtitle }}</p>
                </div>
                <div class="about-content">
                    <div class="about-text fade-item visible">
                        <p [innerHTML]="t().about.p1"></p>
                        <p>{{ t().about.p2 }}</p>
                        <p>{{ t().about.p3 }}</p>
                        
                        <div class="education-card fade-item visible">
                            <h3><i class="fas fa-graduation-cap"></i> {{ t().about.education }}</h3>
                            <div class="degree">{{ t().about.degree }}</div>
                            <span class="duration">{{ t().about.duration }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="resume-section fade-in visible">
            <div class="container">
                <div class="resume-content">
                    <h2>{{ t().about.resumeTitle }}</h2>
                    <p>{{ t().about.resumeDesc }}</p>
                    <a href="assets/Files/CV.pdf" download class="btn btn-primary">
                        <i class="fas fa-download"></i> {{ t().about.downloadBtn }}
                    </a>
                </div>
            </div>
        </section>
    </div>
  `
})
export class AboutComponent {
  ts = inject(TranslationService);
  t = this.ts.t;
}
