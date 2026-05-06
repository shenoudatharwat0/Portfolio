import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProjectsService } from '../services/projects.service';
import { Project } from '../../../shared/models/project.model';
import { SeoService } from '../../../core/services/seo.service';

@Component({
  selector: 'app-projects-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <section class="projects-section">
      <div class="container">
        <!-- Header -->
        <div class="section-header">
          <h1 class="section-title">Projects</h1>
          <p class="section-subtitle">Explore my portfolio of web development projects</p>
        </div>

        <!-- Filter Bar -->
        <div class="filter-bar">
          <div class="search-box">
            <i class="fas fa-search"></i>
            <input 
              type="text" 
              [(ngModel)]="searchQuery"
              (ngModelChange)="applyFilters()"
              placeholder="Search projects..."
              aria-label="Search projects"
            />
          </div>
          
          <div class="tech-filters">
            <button 
              *ngFor="let tech of uniqueTechStacks"
              [class.active]="selectedTech === tech"
              (click)="filterByTech(tech)"
              class="tech-chip"
              [attr.aria-pressed]="selectedTech === tech"
            >
              {{ tech }}
            </button>
          </div>
          
          <button 
            *ngIf="selectedTech || searchQuery"
            (click)="clearFilters()"
            class="clear-filters-btn"
          >
            Clear Filters
          </button>
        </div>

        <!-- Loading State -->
        @if (loading()) {
          <div class="skeleton-grid">
            @for (item of [1,2,3,4,5,6]; track item) {
              <div class="skeleton-card">
                <div class="skeleton-image"></div>
                <div class="skeleton-content">
                  <div class="skeleton-title"></div>
                  <div class="skeleton-desc"></div>
                  <div class="skeleton-tags">
                    <span class="skeleton-tag"></span>
                    <span class="skeleton-tag"></span>
                  </div>
                </div>
              </div>
            }
          </div>
        }

        <!-- Projects Grid -->
        @if (!loading() && filteredProjects.length > 0) {
          <div class="projects-grid" role="list" aria-live="polite">
            @for (project of filteredProjects; track project.id) {
              <article class="project-card" role="listitem">
                <div class="card-image">
                  @if (project.media[0]) {
                    <img 
                      [src]="project.media[0].src" 
                      [alt]="project.media[0].alt"
                      loading="lazy"
                    />
                  }
                  @if (project.featured) {
                    <span class="featured-badge">Featured</span>
                  }
                </div>
                
                <div class="card-content">
                  <h3 class="card-title">{{ project.title }}</h3>
                  <p class="card-description">{{ project.shortDesc }}</p>
                  
                  <div class="tech-stack">
                    @for (tech of project.techStack.slice(0, 3); track tech) {
                      <span class="tech-badge">{{ tech }}</span>
                    }
                    @if (project.techStack.length > 3) {
                      <span class="tech-badge more">+{{ project.techStack.length - 3 }}</span>
                    }
                  </div>
                  
                  <div class="card-footer">
                    <a [routerLink]="['/projects', project.slug]" class="view-details-btn">
                      View Case Study
                      <i class="fas fa-arrow-right"></i>
                    </a>
                    @if (project.liveUrl) {
                      <a [href]="project.liveUrl" target="_blank" rel="noopener noreferrer" class="live-demo-btn">
                        <i class="fas fa-external-link-alt"></i>
                      </a>
                    }
                  </div>
                </div>
              </article>
            }
          </div>
        }

        <!-- Empty State -->
        @if (!loading() && filteredProjects.length === 0) {
          <div class="empty-state">
            <i class="fas fa-folder-open"></i>
            <h3>No projects found</h3>
            <p>Try adjusting your filters or search query</p>
            <button (click)="clearFilters()" class="clear-filters-btn">Clear All Filters</button>
          </div>
        }
      </div>
    </section>
  `,
  styles: [`
    .projects-section {
      padding: 6rem 0;
      min-height: 100vh;
    }
    
    .container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 2rem;
    }
    
    .section-header {
      text-align: center;
      margin-bottom: 3rem;
    }
    
    .section-title {
      font-size: 3rem;
      font-weight: 700;
      background: linear-gradient(135deg, #fff, #93c5fd);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 1rem;
    }
    
    .section-subtitle {
      color: #94a3b8;
      font-size: 1.2rem;
    }
    
    .filter-bar {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      align-items: center;
      margin-bottom: 3rem;
      padding: 1.5rem;
      background: rgba(23, 23, 23, 0.6);
      border-radius: 16px;
      border: 1px solid rgba(255, 255, 255, 0.08);
    }
    
    .search-box {
      flex: 1;
      min-width: 250px;
      position: relative;
    }
    
    .search-box i {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      color: #94a3b8;
    }
    
    .search-box input {
      width: 100%;
      padding: 0.75rem 1rem 0.75rem 2.75rem;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      color: #f8fafc;
      font-size: 1rem;
      transition: all 0.3s ease;
    }
    
    .search-box input:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
    
    .tech-filters {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    
    .tech-chip {
      padding: 0.5rem 1rem;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 20px;
      color: #94a3b8;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 0.9rem;
    }
    
    .tech-chip:hover {
      background: rgba(59, 130, 246, 0.2);
      border-color: #3b82f6;
      color: #fff;
    }
    
    .tech-chip.active {
      background: #3b82f6;
      border-color: #3b82f6;
      color: #fff;
    }
    
    .clear-filters-btn {
      padding: 0.5rem 1rem;
      background: transparent;
      border: 1px solid rgba(239, 68, 68, 0.5);
      border-radius: 8px;
      color: #ef4444;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 0.9rem;
    }
    
    .clear-filters-btn:hover {
      background: rgba(239, 68, 68, 0.1);
      border-color: #ef4444;
    }
    
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 2rem;
    }
    
    .project-card {
      background: rgba(23, 23, 23, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px;
      overflow: hidden;
      transition: all 0.3s ease;
      animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .project-card:hover {
      transform: translateY(-8px);
      border-color: rgba(59, 130, 246, 0.3);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
    }
    
    .card-image {
      position: relative;
      height: 220px;
      overflow: hidden;
    }
    
    .card-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }
    
    .project-card:hover .card-image img {
      transform: scale(1.1);
    }
    
    .featured-badge {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: linear-gradient(135deg, #f59e0b, #f97316);
      color: #fff;
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 600;
    }
    
    .card-content {
      padding: 1.5rem;
    }
    
    .card-title {
      font-size: 1.5rem;
      font-weight: 600;
      color: #f8fafc;
      margin-bottom: 0.75rem;
    }
    
    .card-description {
      color: #94a3b8;
      font-size: 0.95rem;
      line-height: 1.6;
      margin-bottom: 1rem;
    }
    
    .tech-stack {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
    }
    
    .tech-badge {
      padding: 0.25rem 0.75rem;
      background: rgba(59, 130, 246, 0.15);
      border: 1px solid rgba(59, 130, 246, 0.3);
      border-radius: 12px;
      color: #60a5fa;
      font-size: 0.8rem;
      font-weight: 500;
    }
    
    .tech-badge.more {
      background: rgba(148, 163, 184, 0.15);
      border-color: rgba(148, 163, 184, 0.3);
      color: #94a3b8;
    }
    
    .card-footer {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    
    .view-details-btn {
      flex: 1;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.75rem 1rem;
      background: linear-gradient(135deg, #3b82f6, #2563eb);
      color: #fff;
      border-radius: 10px;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.9rem;
      transition: all 0.3s ease;
    }
    
    .view-details-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
    }
    
    .live-demo-btn {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 10px;
      color: #94a3b8;
      text-decoration: none;
      transition: all 0.3s ease;
    }
    
    .live-demo-btn:hover {
      background: rgba(59, 130, 246, 0.2);
      border-color: #3b82f6;
      color: #fff;
    }
    
    .skeleton-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 2rem;
    }
    
    .skeleton-card {
      background: rgba(23, 23, 23, 0.6);
      border-radius: 16px;
      overflow: hidden;
    }
    
    .skeleton-image {
      height: 220px;
      background: linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
    }
    
    .skeleton-content {
      padding: 1.5rem;
    }
    
    .skeleton-title {
      height: 24px;
      width: 70%;
      background: linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
      border-radius: 4px;
      margin-bottom: 1rem;
    }
    
    .skeleton-desc {
      height: 16px;
      width: 100%;
      background: linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
      border-radius: 4px;
      margin-bottom: 0.5rem;
    }
    
    .skeleton-tags {
      display: flex;
      gap: 0.5rem;
      margin-top: 1rem;
    }
    
    .skeleton-tag {
      height: 24px;
      width: 60px;
      background: linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
      border-radius: 12px;
    }
    
    @keyframes shimmer {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
    
    .empty-state {
      text-align: center;
      padding: 4rem 2rem;
    }
    
    .empty-state i {
      font-size: 4rem;
      color: #374151;
      margin-bottom: 1rem;
    }
    
    .empty-state h3 {
      font-size: 1.5rem;
      color: #f8fafc;
      margin-bottom: 0.5rem;
    }
    
    .empty-state p {
      color: #94a3b8;
      margin-bottom: 1.5rem;
    }
    
    @media (max-width: 768px) {
      .projects-grid {
        grid-template-columns: 1fr;
      }
      
      .section-title {
        font-size: 2rem;
      }
      
      .filter-bar {
        flex-direction: column;
        align-items: stretch;
      }
      
      .search-box {
        min-width: 100%;
      }
    }
  `]
})
export class ProjectsListComponent implements OnInit {
  private readonly projectsService = inject(ProjectsService);
  private readonly seoService = inject(SeoService);
  private readonly route = inject(ActivatedRoute);

  searchQuery = signal<string>('');
  selectedTech = signal<string | null>(null);
  filteredProjects = signal<Project[]>([]);
  
  readonly loading = this.projectsService.loading;
  readonly uniqueTechStacks = computed(() => this.projectsService.getUniqueTechStacks());

  ngOnInit(): void {
    this.seoService.updateSeo({
      title: 'Projects | Shenouda Tharwat',
      description: 'Explore my portfolio of web development projects featuring Angular, .NET, and modern technologies.'
    });

    this.projectsService.loadProjects().subscribe();

    // Check URL for filter params
    this.route.queryParams.subscribe(params => {
      if (params['tech']) {
        this.selectedTech.set(params['tech']);
      }
      if (params['search']) {
        this.searchQuery.set(params['search']);
      }
      this.applyFilters();
    });
  }

  applyFilters(): void {
    const filter = {
      tech: this.selectedTech() || undefined,
      search: this.searchQuery() || undefined
    };
    
    const results = this.projectsService.filterProjects(filter);
    this.filteredProjects.set(results);
    
    // Update URL without reloading
    this.updateUrlParams();
  }

  filterByTech(tech: string): void {
    if (this.selectedTech() === tech) {
      this.selectedTech.set(null);
    } else {
      this.selectedTech.set(tech);
    }
    this.applyFilters();
  }

  clearFilters(): void {
    this.searchQuery.set('');
    this.selectedTech.set(null);
    this.applyFilters();
  }

  private updateUrlParams(): void {
    const params: any = {};
    if (this.searchQuery()) {
      params['search'] = this.searchQuery();
    }
    if (this.selectedTech()) {
      params['tech'] = this.selectedTech();
    }
    // URL update logic would go here with router
  }
}

// Add missing import
import { computed } from '@angular/core';
