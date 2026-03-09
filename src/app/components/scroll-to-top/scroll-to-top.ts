import { Component, HostListener, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-scroll-to-top',
  template: `
    <button class="scroll-to-top" [class.visible]="isVisible()" (click)="scrollToTop()">
      <i class="fas fa-arrow-up"></i>
    </button>
  `
})
export class ScrollToTopComponent {
  isVisible = signal(false);
  platformId = inject(PLATFORM_ID);

  @HostListener('window:scroll')
  onScroll() {
    if (isPlatformBrowser(this.platformId)) {
      this.isVisible.set(window.scrollY > 500);
    }
  }

  scrollToTop() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
