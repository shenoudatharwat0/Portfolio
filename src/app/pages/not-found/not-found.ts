import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    <div class="error-page">
        <div class="error-content">
            <h1>404</h1>
            <h2>{{ t().notFound.title }}</h2>
            <p>{{ t().notFound.desc }}</p>
            <div class="error-actions">
                <a routerLink="/" class="btn btn-primary">
                    <i class="fas fa-home"></i> {{ t().nav.home }}
                </a>
                <a routerLink="/contact" class="btn btn-secondary">
                    <i class="fas fa-envelope"></i> {{ t().nav.contact }}
                </a>
            </div>
        </div>
    </div>
  `,
  styles: [`
    .error-page {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 2rem;
    }
    .error-content h1 {
        font-family: 'Playfair Display', serif;
        font-size: 8rem;
        font-weight: 900;
        background: linear-gradient(135deg, var(--text) 0%, var(--highlight) 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin-bottom: 1rem;
    }
    .error-content h2 {
        font-size: 2.5rem;
        margin-bottom: 1.5rem;
        color: var(--text);
    }
    .error-content p {
        font-size: 1.2rem;
        color: var(--text-dim);
        margin-bottom: 2.5rem;
        max-width: 500px;
        margin-left: auto;
        margin-right: auto;
    }
    .error-actions {
        display: flex;
        gap: 1.5rem;
        justify-content: center;
        flex-wrap: wrap;
    }
    @media (max-width: 768px) {
        .error-content h1 { font-size: 5rem; }
        .error-content h2 { font-size: 2rem; }
        .error-actions { flex-direction: column; }
    }
  `]
})
export class NotFoundComponent {
  ts = inject(TranslationService);
  t = this.ts.t;
}
