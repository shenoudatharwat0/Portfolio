# Angular Portfolio Source Code

Professional Angular 19+ portfolio application with feature-based architecture, dynamic project showcase, and modern performance optimizations.

## Project Structure

```
src/
├── app/
│   ├── core/              # Singleton services, guards, interceptors
│   │   ├── services/
│   │   │   ├── seo.service.ts
│   │   │   └── ai-assistant.service.ts
│   │   ├── guards/
│   │   └── interceptors/
│   │
│   ├── shared/            # Reusable components, directives, pipes, models
│   │   ├── models/
│   │   │   ├── project.model.ts
│   │   │   ├── skill.model.ts
│   │   │   └── translation.model.ts
│   │   ├── components/
│   │   ├── directives/
│   │   └── pipes/
│   │
│   ├── features/          # Feature modules
│   │   ├── home/
│   │   ├── about/
│   │   ├── projects/
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   │   ├── projects-list/
│   │   │   │   └── project-detail/
│   │   │   ├── services/
│   │   │   └── projects.routes.ts
│   │   ├── skills/
│   │   ├── services/
│   │   └── contact/
│   │
│   ├── app.component.ts
│   ├── app.config.ts
│   └── app.routes.ts
│
├── assets/
├── environments/
└── styles/
```

## Key Features

### 🎯 Project Showcase
- **Instant Multi-Tech Filtering**: Filter projects by technology with URL-synced parameters
- **Case Study Format**: Each project has a dedicated detail page with Problem → Solution → Outcomes structure
- **Skeleton Loaders**: Perceived performance optimization during data loading
- **Accessibility**: Full keyboard navigation and ARIA labels

### 🔍 SEO Optimization
- Dynamic meta tags per route
- Open Graph and Twitter Card integration
- Semantic HTML structure
- Sitemap and robots.txt ready

### ⚡ Performance
- Lazy-loaded routes
- Signal-based state management
- Optimized bundle splitting
- Image lazy loading

### 🌐 Internationalization Ready
- English and Arabic support
- RTL layout support
- Translation models defined

## Getting Started

### Prerequisites
- Node.js 20+ 
- npm or yarn
- Angular CLI 19+

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

### Environment Configuration

Update `src/environments/environment.ts` with your API keys:

```typescript
export const environment = {
  production: false,
  apiUrl: 'YOUR_API_URL',
  geminiApiKey: 'YOUR_GEMINI_API_KEY',
  cmsApiUrl: 'YOUR_CMS_API_URL'
};
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server |
| `npm run build` | Build for production |
| `npm run watch` | Watch mode for development |
| `npm test` | Run unit tests |
| `npm run lint` | Lint codebase |

## Component Highlights

### ProjectsListComponent (`/projects`)
- Search functionality
- Technology filter chips
- Skeleton loading states
- Empty state handling
- Responsive grid layout

### ProjectDetailComponent (`/projects/:slug`)
- Hero section with project image
- Problem/Solution cards
- Tech stack badges
- Outcomes & impact section
- Media gallery
- Testimonial integration
- CTA section

## Next Steps

1. **Add Placeholder Components**: Create stub components for Home, About, Skills, Services, Contact
2. **Integrate CMS**: Connect to Headless CMS (Storyblok, Sanity, Strapi)
3. **Add Sample Data**: Create mock projects for testing
4. **Configure PWA**: Add service worker and manifest
5. **Setup CI/CD**: Configure GitHub Actions for automated deployment

## License

MIT © Shenouda Tharwat
