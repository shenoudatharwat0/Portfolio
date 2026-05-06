import { Routes } from '@angular/router';

export const PROJECTS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/projects-list/projects-list.component').then(m => m.ProjectsListComponent),
    data: {
      seo: {
        title: 'Projects | Shenouda Tharwat',
        description: 'Explore my portfolio of web development projects featuring Angular, .NET, and modern technologies.'
      }
    }
  },
  {
    path: ':slug',
    loadComponent: () => import('./pages/project-detail/project-detail.component').then(m => m.ProjectDetailComponent),
    data: {
      seo: {
        title: 'Project Details | Shenouda Tharwat',
        description: 'Detailed case study of a web development project.'
      }
    }
  }
];
