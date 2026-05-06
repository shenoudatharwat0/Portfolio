import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from, switchMap } from 'rxjs';
import { Project, ProjectFilter } from '../../../shared/models/project.model';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  private readonly http = inject(HttpClient);
  
  private readonly projectsSignal = signal<Project[]>([]);
  private readonly loadingSignal = signal<boolean>(false);
  private readonly errorSignal = signal<string | null>(null);

  readonly projects = this.projectsSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();

  readonly featuredProjects = computed(() => 
    this.projectsSignal().filter(p => p.featured)
  );

  loadProjects(): Observable<Project[]> {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    return this.http.get<{ projects: Project[] }>(`${environment.apiUrl}/projects`)
      .pipe(
        switchMap(response => {
          this.projectsSignal.set(response.projects);
          this.loadingSignal.set(false);
          return from([response.projects]);
        })
      );
  }

  getProjectBySlug(slug: string): Project | undefined {
    return this.projectsSignal().find(p => p.slug === slug);
  }

  filterProjects(filter: ProjectFilter): Project[] {
    let result = this.projectsSignal();

    if (filter.tech) {
      result = result.filter(p => p.techStack.includes(filter.tech!));
    }

    if (filter.featured !== undefined) {
      result = result.filter(p => p.featured === filter.featured);
    }

    if (filter.search) {
      const searchLower = filter.search.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(searchLower) ||
        p.shortDesc.toLowerCase().includes(searchLower) ||
        p.techStack.some(t => t.toLowerCase().includes(searchLower))
      );
    }

    return result;
  }

  getUniqueTechStacks(): string[] {
    const allTech = this.projectsSignal().flatMap(p => p.techStack);
    return [...new Set(allTech)].sort();
  }
}
