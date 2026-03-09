import { Component, inject, signal } from '@angular/core';
import { TranslationService } from '../../services/translation.service';
import { ParallaxDirective } from '../../directives/parallax.directive';
import { ImageFadeDirective } from '../../directives/image-fade.directive';

@Component({
  selector: 'app-projects',
  imports: [ParallaxDirective, ImageFadeDirective],
  template: `
    <div class="page-container">
        <section id="projects" class="fade-in visible">
            <div class="container">
                <div class="section-header">
                    <h2>{{ t().projects.title }}</h2>
                    <p>{{ t().projects.subtitle }}</p>
                </div>
                <div class="projects-header">
                    <div class="project-filters">
                        <button class="project-filter" [class.active]="activeFilter() === 'all'" (click)="setFilter('all')">{{ t().projects.filters.all }}</button>
                        <button class="project-filter" [class.active]="activeFilter() === 'web'" (click)="setFilter('web')">{{ t().projects.filters.web }}</button>
                        <button class="project-filter" [class.active]="activeFilter() === 'system'" (click)="setFilter('system')">{{ t().projects.filters.system }}</button>
                    </div>
                </div>
                
                <div class="projects-grid">
                    @for (project of filteredProjects(); track project.id) {
                    <div class="project-card fade-item visible">
                        <div class="project-img-container">
                            <div class="parallax-wrapper" [appParallax]="0.2">
                                <img [src]="project.img" [alt]="project.title" class="project-img" appImageFade loading="lazy" referrerPolicy="no-referrer" (error)="handleImageError($event, project.id)">
                            </div>
                            <a [href]="project.link" target="_blank" class="project-link-overlay">
                                <i class="fas fa-external-link-alt"></i>
                            </a>
                        </div>
                        <div class="project-content">
                            <div class="project-header">
                                <div>
                                    <h3>{{ project.title }}</h3>
                                    <p class="project-role">{{ project.role }}</p>
                                </div>
                            </div>
                            
                            <div class="project-tags">
                                @for (tag of getTags(project.tech); track tag) {
                                    <span class="project-tag">{{ tag }}</span>
                                }
                            </div>

                            <p class="project-description">{{ project.desc }}</p>
                            <ul class="project-features">
                                @for (feature of project.features; track feature) {
                                    <li [innerHTML]="feature"></li>
                                }
                            </ul>
                            <div class="project-actions">
                                <a [href]="project.link" target="_blank" class="btn btn-sm btn-outline">
                                    <i class="fab fa-github"></i> {{ t().projects.viewInGithub }}
                                </a>
                            </div>
                        </div>
                    </div>
                    }
                </div>
            </div>
        </section>
    </div>
  `
})
export class ProjectsComponent {
  ts = inject(TranslationService);
  t = this.ts.t;
  activeFilter = signal('all');

  setFilter(filter: string) {
    this.activeFilter.set(filter);
  }

  filteredProjects() {
    const projects = this.t().projects.list;
    if (this.activeFilter() === 'all') return projects;
    return projects.filter(p => p.category === this.activeFilter());
  }

  getTags(tech: string): string[] {
    return tech.split(',').map(t => t.trim());
  }

  handleImageError(event: Event, id: number | string) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = `https://picsum.photos/seed/${id}/800/600`;
  }
}
