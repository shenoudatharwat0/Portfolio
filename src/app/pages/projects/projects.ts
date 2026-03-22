import { Component, inject, signal, OnInit } from '@angular/core';
import { TranslationService } from '../../services/translation.service';
import { ParallaxDirective } from '../../directives/parallax.directive';
import { ImageFadeDirective } from '../../directives/image-fade.directive';
import { TiltDirective } from '../../directives/tilt.directive';
import { InViewDirective } from '../../directives/in-view.directive';
import { GithubService } from '../../services/github.service';

@Component({
  selector: 'app-projects',
  imports: [ParallaxDirective, ImageFadeDirective, TiltDirective, InViewDirective],
  template: `
    <div class="page-container">
        <section id="projects" appInView>
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
                    <div class="project-card fade-item visible" [appTilt]="12" appInView>
                        <div class="project-img-container">
                            <div class="parallax-wrapper" [appParallax]="0.2">
                                <img [src]="project.img" [alt]="project.title" class="project-img" appImageFade loading="lazy" (error)="handleImageError($event, project.id)">
                            </div>
                            <a [href]="project.link" target="_blank" rel="noopener noreferrer" class="project-link-overlay">
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
                                <a [href]="project.link" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline">
                                    <i class="fab fa-github"></i> {{ t().projects.viewInGithub }}
                                </a>
                            </div>
                        </div>
                    </div>
                    }
                </div>
            </div>
        </section>

        <section id="github-activity" class="github-section" appInView>
            <div class="container">
                <div class="section-header" style="margin-bottom: 3rem;">
                    <h2>Live GitHub Activity</h2>
                    <p>My latest recent open-source work directly from GitHub.</p>
                </div>
                
                @if (github.isLoading()) {
                    <div style="text-align: center; padding: 3rem; color: var(--highlight);">
                        <i class="fas fa-spinner fa-spin fa-2x"></i>
                    </div>
                } @else if (github.error()) {
                    <div style="text-align: center; color: var(--danger);">
                        <i class="fas fa-exclamation-triangle"></i> {{ github.error() }}
                    </div>
                } @else {
                    <div class="github-grid">
                        @for (repo of github.repos(); track repo.id) {
                            <div class="github-card" [appTilt]="8">
                                <div class="github-card-header">
                                    <i class="fab fa-github" style="font-size: 1.5rem; color: var(--text);"></i>
                                    <h3>{{ repo.name }}</h3>
                                </div>
                                <p class="github-desc">{{ repo.description || 'No description provided.' }}</p>
                                <div class="github-footer">
                                    <span style="display: flex; gap: 15px;">
                                        <span class="github-lang" style="display: flex; align-items: center; gap: 6px; font-weight: 500;">
                                            <span style="width: 10px; height: 10px; border-radius: 50%; background: var(--highlight);"></span>
                                            {{ repo.language || 'Code' }}
                                        </span>
                                        <span style="color: var(--text-dim); display: flex; align-items: center; gap: 4px;">
                                            <i class="fas fa-star" style="color: #fbbf24;"></i> {{ repo.stargazers_count }}
                                        </span>
                                    </span>
                                    <a [href]="repo.html_url" target="_blank" rel="noopener noreferrer" style="color: var(--highlight); text-decoration: none; font-weight: 600; display: flex; align-items: center; gap: 5px;">
                                        View Code <i class="fas fa-arrow-right"></i>
                                    </a>
                                </div>
                            </div>
                        }
                    </div>
                }
            </div>
        </section>
    </div>
  `,
  styles: [`
    .github-section {
      padding-top: 0;
    }
    .github-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 1.5rem;
    }
    .github-card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: var(--border-radius);
      padding: 1.8rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      transition: var(--transition);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
    }
    .github-card:hover {
      border-color: var(--highlight);
      box-shadow: var(--shadow-hover);
    }
    .github-card-header {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .github-card-header h3 {
      font-size: 1.25rem;
      color: var(--highlight);
      margin: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .github-desc {
      color: var(--text-dim);
      font-size: 0.95rem;
      flex-grow: 1;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .github-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid var(--border);
      font-size: 0.9rem;
    }
  `]
})
export class ProjectsComponent implements OnInit {
  ts = inject(TranslationService);
  t = this.ts.t;
  github = inject(GithubService);
  activeFilter = signal('all');

  ngOnInit() {
    this.github.fetchRecentRepos();
  }

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
    const label = typeof id === 'string' ? id : `Project ${id}`;
    const placeholderSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
        <defs>
          <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#0f172a" />
            <stop offset="100%" stop-color="#1e293b" />
          </linearGradient>
        </defs>
        <rect width="800" height="600" fill="url(#bg)" />
        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
          fill="#e2e8f0" font-size="36" font-family="Segoe UI, Arial, sans-serif">
          ${label}
        </text>
      </svg>
    `.trim();
    imgElement.src = `data:image/svg+xml;utf8,${encodeURIComponent(placeholderSvg)}`;
  }
}
