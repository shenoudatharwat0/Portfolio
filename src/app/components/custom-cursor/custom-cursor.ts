import { Component, HostListener, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-custom-cursor',
  standalone: true,
  template: `
    @if (isBrowser) {
      <div class="cursor"
           [style.transform]="'translate(' + x() + 'px, ' + y() + 'px)'"
           [class.active]="isHovering()">
      </div>
    }
  `,
  styles: [`
    .cursor {
      position: fixed;
      top: 0;
      left: 0;
      width: 20px;
      height: 20px;
      border: 2px solid var(--highlight);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transition: width 0.2s, height 0.2s, background-color 0.2s, transform 0.05s linear;
      will-change: transform;
    }
    .cursor.active {
      width: 40px;
      height: 40px;
      background-color: var(--highlight);
      opacity: 0.3;
      border-color: transparent;
    }
    @media (max-width: 768px) {
      .cursor {
        display: none;
      }
    }
  `]
})
export class CustomCursorComponent {
  x = signal(0);
  y = signal(0);
  isHovering = signal(false);
  
  platformId = inject(PLATFORM_ID);
  isBrowser = isPlatformBrowser(this.platformId);

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.isBrowser) {
      // Offset by half of standard width to center it at the mouse position
      this.x.set(event.clientX - 10);
      this.y.set(event.clientY - 10);
      
      const target = event.target as HTMLElement;
      const isClickable = target.closest('a, button, input, textarea, .project-card, .skill-category, .theme-btn');
      this.isHovering.set(!!isClickable);
    }
  }
}
