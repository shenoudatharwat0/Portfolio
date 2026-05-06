import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
    data: {
      seo: {
        title: 'Home | Shenouda Tharwat | Full-Stack Developer',
        description: 'Full-Stack .NET & Angular Developer crafting scalable, high-performance web applications.'
      }
    }
  },
  {
    path: 'about',
    loadComponent: () => import('./features/about/about.component').then(m => m.AboutComponent),
    data: {
      seo: {
        title: 'About | Shenouda Tharwat',
        description: 'Learn about my journey, experience, and passion for software development.'
      }
    }
  },
  {
    path: 'projects',
    loadChildren: () => import('./features/projects/projects.routes').then(m => m.PROJECTS_ROUTES)
  },
  {
    path: 'skills',
    loadComponent: () => import('./features/skills/skills.component').then(m => m.SkillsComponent),
    data: {
      seo: {
        title: 'Skills | Shenouda Tharwat',
        description: 'Explore my technical skills in Angular, .NET, TypeScript, and more.'
      }
    }
  },
  {
    path: 'services',
    loadComponent: () => import('./features/services/services.component').then(m => m.ServicesComponent),
    data: {
      seo: {
        title: 'Services | Shenouda Tharwat',
        description: 'Professional web development services including full-stack development and consulting.'
      }
    }
  },
  {
    path: 'contact',
    loadComponent: () => import('./features/contact/contact.component').then(m => m.ContactComponent),
    data: {
      seo: {
        title: 'Contact | Shenouda Tharwat',
        description: 'Get in touch for project inquiries or collaboration opportunities.'
      }
    }
  },
  {
    path: '**',
    redirectTo: ''
  }
];
