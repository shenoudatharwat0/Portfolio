import { Directive, ElementRef, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { animate, inView } from 'motion';

@Directive({
  selector: '[appInView]',
  standalone: true
})
export class InViewDirective implements OnInit {
  platformId = inject(PLATFORM_ID);
  
  constructor(private el: ElementRef) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.el.nativeElement.style.opacity = '0';
      this.el.nativeElement.style.transform = 'translateY(40px)';

      inView(this.el.nativeElement, (info) => {
        animate(
          info as Element, 
          { opacity: 1, transform: 'translateY(0px)' }, 
          { duration: 0.8, ease: [0.22, 1, 0.36, 1] } // Custom ease for premium feel
        );
      }, { amount: 0.2 }); // Trigger when 20% visible
    }
  }
}
