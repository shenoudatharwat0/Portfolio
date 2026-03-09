import { Directive, ElementRef, HostBinding, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appImageFade]',
  standalone: true
})
export class ImageFadeDirective implements OnInit {
  @HostBinding('class.loaded') isLoaded = false;

  constructor(private el: ElementRef<HTMLImageElement>) {}

  @HostListener('load')
  onLoad() {
    this.isLoaded = true;
  }

  ngOnInit() {
    if (this.el.nativeElement.complete && this.el.nativeElement.naturalHeight > 0) {
      this.isLoaded = true;
    }
  }
}
