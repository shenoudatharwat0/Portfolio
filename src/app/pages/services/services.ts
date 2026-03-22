import { Component, inject } from '@angular/core';
import { TranslationService } from '../../services/translation.service';
import { InViewDirective } from '../../directives/in-view.directive';

@Component({
  selector: 'app-services',
  imports: [InViewDirective],
  template: `
    <div class="page-container">
        <section id="services" appInView>
            <div class="container">
                <div class="section-header">
                    <h2>{{ t().services.title }}</h2>
                    <p>{{ t().services.subtitle }}</p>
                </div>
                <div class="services-grid">
                    @for (service of t().services.list; track service.title) {
                    <div class="service-card" appInView>
                        <div class="service-icon">
                            <i [class]="service.icon"></i>
                        </div>
                        <h3>{{ service.title }}</h3>
                        <p>{{ service.desc }}</p>
                    </div>
                    }
                </div>
            </div>
        </section>
    </div>
  `
})
export class ServicesComponent {
  ts = inject(TranslationService);
  t = this.ts.t;
}
