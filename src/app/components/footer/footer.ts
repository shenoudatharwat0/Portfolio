import { Component, inject } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-footer',
  template: `
    <footer>
        <div class="container">
            <p>&copy; {{ year }} {{ t().home.name }}. {{ t().footer.rights }}</p>
        </div>
    </footer>
  `
})
export class FooterComponent {
  ts = inject(TranslationService);
  t = this.ts.t;
  year = new Date().getFullYear();
}
