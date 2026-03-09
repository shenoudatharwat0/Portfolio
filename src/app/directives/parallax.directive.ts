import { Directive, ElementRef, HostListener, Input, Renderer2, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appParallax]',
  standalone: true
})
export class ParallaxDirective implements OnInit {
  @Input('appParallax') speed: number = 0.1;
  
  private platformId = inject(PLATFORM_ID);
  private isBrowser: boolean;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    // Initial check
    if (this.isBrowser) {
      this.onWindowScroll();
    }
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    if (!this.isBrowser) return;

    const rect = this.el.nativeElement.getBoundingClientRect();
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    
    // Check if element is in viewport (with some buffer)
    if (rect.top < windowHeight && rect.bottom > 0) {
      // Calculate relative position in viewport (0 to 1)
      const relativePos = (rect.top + rect.height / 2) / windowHeight;
      // Calculate offset: 0 at center
      // For depth effect (moving slower than scroll), we want the image to move DOWN relative to container when scrolling DOWN
      // Scrolling DOWN -> relativePos decreases (1 -> 0)
      // We want offset to increase (negative -> positive)
      const offset = (0.5 - relativePos) * 100 * this.speed;
      
      this.renderer.setStyle(this.el.nativeElement, '--parallax-y', `${offset}px`);
    }
  }
}
