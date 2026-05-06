import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProjectsService } from '../../services/projects.service';
import { Project } from '../../../../shared/models/project.model';
import { SeoService } from '../../../../core/services/seo.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    @if (project(); as project) {
      <article class="project-detail">
        <!-- Hero Section -->
        <section class="project-hero">
          <div class="container">
            <a routerLink="/projects" class="back-link">
              <i class="fas fa-arrow-left"></i> Back to Projects
            </a>
            
            <div class="hero-content">
              <div class="hero-text">
                <span class="project-role">{{ project.myRole }}</span>
                <h1 class="project-title">{{ project.title }}</h1>
                <p class="project-short-desc">{{ project.shortDesc }}</p>
                
                <div class="hero-actions">
                  @if (project.liveUrl) {
                    <a [href]="project.liveUrl" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
                      <i class="fas fa-external-link-alt"></i> Live Demo
                    </a>
                  }
                  @if (project.repoUrl) {
                    <a [href]="project.repoUrl" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
                      <i class="fab fa-github"></i> Source Code
                    </a>
                  }
                </div>
              </div>
              
              @if (project.media[0]) {
                <div class="hero-image">
                  <img [src]="project.media[0].src" [alt]="project.media[0].alt" />
                </div>
              }
            </div>
          </div>
        </section>

        <!-- Case Study Content -->
        <section class="case-study">
          <div class="container">
            <!-- Problem & Solution Grid -->
            <div class="problem-solution-grid">
              <div class="case-card problem-card">
                <div class="card-icon">
                  <i class="fas fa-exclamation-circle"></i>
                </div>
                <h2>The Problem</h2>
                <p>{{ project.problem }}</p>
              </div>
              
              <div class="case-card solution-card">
                <div class="card-icon">
                  <i class="fas fa-lightbulb"></i>
                </div>
                <h2>The Solution</h2>
                <p>{{ project.solution }}</p>
              </div>
            </div>

            <!-- Tech Stack -->
            <div class="tech-stack-section">
              <h2>Technologies Used</h2>
              <div class="tech-badges">
                @for (tech of project.techStack; track tech) {
                  <span class="tech-badge">{{ tech }}</span>
                }
              </div>
            </div>

            <!-- Outcomes -->
            <div class="outcomes-section">
              <h2>Outcomes & Impact</h2>
              <div class="outcomes-grid">
                @for (outcome of project.outcomes; track outcome) {
                  <div class="outcome-item">
                    <i class="fas fa-check-circle"></i>
                    <span>{{ outcome }}</span>
                  </div>
                }
              </div>
            </div>

            <!-- Media Gallery -->
            @if (project.media.length > 1) {
              <div class="gallery-section">
                <h2>Project Gallery</h2>
                <div class="gallery-grid">
                  @for (media of project.media.slice(1); track media.src) {
                    <div class="gallery-item">
                      @if (media.type === 'image') {
                        <img [src]="media.src" [alt]="media.alt" loading="lazy" />
                        @if (media.caption) {
                          <p class="caption">{{ media.caption }}</p>
                        }
                      } @else if (media.type === 'video') {
                        <video controls>
                          <source [src]="media.src" type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      }
                    </div>
                  }
                </div>
              </div>
            }

            <!-- Testimonial -->
            @if (project.testimonial) {
              <div class="testimonial-section">
                <div class="testimonial-card">
                  <i class="fas fa-quote-left quote-icon"></i>
                  <p class="testimonial-quote">{{ project.testimonial.quote }}</p>
                  <div class="testimonial-author">
                    @if (project.testimonial.avatar) {
                      <img [src]="project.testimonial.avatar" [alt]="project.testimonial.author" />
                    }
                    <div class="author-info">
                      <strong>{{ project.testimonial.author }}</strong>
                      <span>{{ project.testimonial.role }} at {{ project.testimonial.company }}</span>
                    </div>
                  </div>
                </div>
              </div>
            }

            <!-- CTA -->
            <div class="cta-section">
              <h2>Interested in a Similar Solution?</h2>
              <p>Let's discuss how I can help bring your project to life</p>
              <a routerLink="/contact" class="btn btn-primary">Get In Touch</a>
            </div>
          </div>
        </section>
      </article>
    } @else if (!loading()) {
      <div class="not-found">
        <i class="fas fa-folder-open"></i>
        <h2>Project Not Found</h2>
        <p>The project you're looking for doesn't exist or has been removed.</p>
        <a routerLink="/projects" class="btn btn-primary">Browse All Projects</a>
      </div>
    } @else {
      <div class="loading-detail">
        <div class="spinner"></div>
      </div>
    }
  `,
  styles: [`
    .project-detail {
      min-height: 100vh;
      padding-bottom: 4rem;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
    }

    .back-link {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      color: #94a3b8;
      text-decoration: none;
      margin-bottom: 2rem;
      transition: all 0.3s ease;
    }

    .back-link:hover {
      color: #3b82f6;
      transform: translateX(-4px);
    }

    .project-hero {
      padding: 4rem 0;
      background: linear-gradient(180deg, rgba(23, 23, 23, 0.8) 0%, rgba(10, 10, 10, 0) 100%);
    }

    .hero-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: center;
    }

    .project-role {
      display: inline-block;
      padding: 0.5rem 1rem;
      background: rgba(59, 130, 246, 0.15);
      border: 1px solid rgba(59, 130, 246, 0.3);
      border-radius: 20px;
      color: #60a5fa;
      font-size: 0.9rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
    }

    .project-title {
      font-size: 3.5rem;
      font-weight: 700;
      background: linear-gradient(135deg, #fff, #93c5fd);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 1rem;
      line-height: 1.2;
    }

    .project-short-desc {
      color: #94a3b8;
      font-size: 1.2rem;
      line-height: 1.8;
      margin-bottom: 2rem;
    }

    .hero-actions {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 1rem 2rem;
      border-radius: 12px;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.3s ease;
    }

    .btn-primary {
      background: linear-gradient(135deg, #3b82f6, #2563eb);
      color: #fff;
      box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
    }

    .btn-secondary {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: #f8fafc;
    }

    .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.2);
    }

    .hero-image {
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
    }

    .hero-image img {
      width: 100%;
      height: auto;
      display: block;
    }

    .case-study {
      padding: 4rem 0;
    }

    .problem-solution-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-bottom: 4rem;
    }

    .case-card {
      padding: 2.5rem;
      border-radius: 16px;
      border: 1px solid rgba(255, 255, 255, 0.08);
    }

    .problem-card {
      background: rgba(239, 68, 68, 0.05);
      border-color: rgba(239, 68, 68, 0.2);
    }

    .solution-card {
      background: rgba(16, 185, 129, 0.05);
      border-color: rgba(16, 185, 129, 0.2);
    }

    .card-icon {
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 12px;
      margin-bottom: 1.5rem;
      font-size: 1.5rem;
    }

    .problem-card .card-icon {
      background: rgba(239, 68, 68, 0.15);
      color: #ef4444;
    }

    .solution-card .card-icon {
      background: rgba(16, 185, 129, 0.15);
      color: #10b981;
    }

    .case-card h2 {
      font-size: 1.5rem;
      color: #f8fafc;
      margin-bottom: 1rem;
    }

    .case-card p {
      color: #94a3b8;
      line-height: 1.8;
    }

    .tech-stack-section,
    .outcomes-section,
    .gallery-section,
    .testimonial-section,
    .cta-section {
      margin-bottom: 4rem;
    }

    h2 {
      font-size: 2rem;
      color: #f8fafc;
      margin-bottom: 2rem;
      text-align: center;
    }

    .tech-badges {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.75rem;
    }

    .tech-badge {
      padding: 0.75rem 1.5rem;
      background: rgba(59, 130, 246, 0.15);
      border: 1px solid rgba(59, 130, 246, 0.3);
      border-radius: 12px;
      color: #60a5fa;
      font-weight: 600;
    }

    .outcomes-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
    }

    .outcome-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1.5rem;
      background: rgba(16, 185, 129, 0.05);
      border: 1px solid rgba(16, 185, 129, 0.2);
      border-radius: 12px;
    }

    .outcome-item i {
      color: #10b981;
      font-size: 1.5rem;
    }

    .outcome-item span {
      color: #f8fafc;
      font-weight: 500;
    }

    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    .gallery-item {
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.08);
    }

    .gallery-item img,
    .gallery-item video {
      width: 100%;
      height: auto;
      display: block;
    }

    .gallery-item .caption {
      padding: 1rem;
      color: #94a3b8;
      font-size: 0.9rem;
      text-align: center;
    }

    .testimonial-card {
      max-width: 800px;
      margin: 0 auto;
      padding: 3rem;
      background: rgba(59, 130, 246, 0.05);
      border: 1px solid rgba(59, 130, 246, 0.2);
      border-radius: 16px;
      text-align: center;
      position: relative;
    }

    .quote-icon {
      font-size: 3rem;
      color: #3b82f6;
      opacity: 0.3;
      margin-bottom: 1.5rem;
    }

    .testimonial-quote {
      font-size: 1.2rem;
      color: #f8fafc;
      line-height: 1.8;
      font-style: italic;
      margin-bottom: 2rem;
    }

    .testimonial-author {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
    }

    .testimonial-author img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid #3b82f6;
    }

    .author-info {
      text-align: left;
    }

    .author-info strong {
      display: block;
      color: #f8fafc;
      font-size: 1.1rem;
      margin-bottom: 0.25rem;
    }

    .author-info span {
      color: #94a3b8;
      font-size: 0.9rem;
    }

    .cta-section {
      text-align: center;
      padding: 4rem 2rem;
      background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(37, 99, 235, 0.05));
      border-radius: 24px;
      border: 1px solid rgba(59, 130, 246, 0.2);
    }

    .cta-section h2 {
      margin-bottom: 1rem;
    }

    .cta-section p {
      color: #94a3b8;
      font-size: 1.1rem;
      margin-bottom: 2rem;
    }

    .not-found,
    .loading-detail {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 60vh;
      text-align: center;
    }

    .not-found i {
      font-size: 5rem;
      color: #374151;
      margin-bottom: 1.5rem;
    }

    .not-found h2 {
      color: #f8fafc;
      margin-bottom: 0.5rem;
    }

    .not-found p {
      color: #94a3b8;
      margin-bottom: 2rem;
    }

    .spinner {
      width: 60px;
      height: 60px;
      border: 4px solid rgba(59, 130, 246, 0.2);
      border-top-color: #3b82f6;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    @media (max-width: 900px) {
      .hero-content {
        grid-template-columns: 1fr;
        text-align: center;
      }

      .hero-actions {
        justify-content: center;
      }

      .project-title {
        font-size: 2.5rem;
      }

      .hero-image {
        order: -1;
      }
    }

    @media (max-width: 600px) {
      .project-title {
        font-size: 2rem;
      }

      .btn {
        width: 100%;
        justify-content: center;
      }
    }
  `]
})
export class ProjectDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly projectsService = inject(ProjectsService);
  private readonly seoService = inject(SeoService);

  project = signal<Project | undefined>(undefined);
  loading = signal<boolean>(true);

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      if (slug) {
        // Load projects if not already loaded
        if (this.projectsService.projects().length === 0) {
          this.projectsService.loadProjects().subscribe(() => {
            this.loadProject(slug);
          });
        } else {
          this.loadProject(slug);
        }
      }
    });
  }

  private loadProject(slug: string): void {
    const project = this.projectsService.getProjectBySlug(slug);
    
    if (project) {
      this.project.set(project);
      this.loading.set(false);
      
      // Update SEO with project-specific data
      this.seoService.updateSeo({
        title: `${project.title} | Shenouda Tharwat`,
        description: project.shortDesc,
        image: project.media[0]?.src,
        type: 'article'
      });
    } else {
      this.loading.set(false);
    }
  }
}
