import { Component, inject, PLATFORM_ID, computed } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
import { NgxParticlesModule } from '@tsparticles/angular';
import { loadFull } from 'tsparticles';
import { Engine, MoveDirection, OutMode } from '@tsparticles/engine';

@Component({
  selector: 'app-particles',
  standalone: true,
  imports: [NgxParticlesModule],
  template: `
    @if (isBrowser) {
      <ngx-particles [id]="id" [options]="particlesOptions()" [particlesInit]="particlesInit"></ngx-particles>
    }
  `,
  styles: [`
    :host {
      display: block;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      pointer-events: none;
    }
  `]
})
export class ParticlesComponent {
  theme = inject(ThemeService);
  platformId = inject(PLATFORM_ID);
  isBrowser = isPlatformBrowser(this.platformId);
  
  id = "tsparticles";

  particlesOptions = computed(() => {
    const theme = this.theme.currentTheme();
    let color = "#ffae00"; // Default Jigar (Yellow)

    if (theme === 'blue') {
      color = "#3282b8"; // Blue
    } else if (theme === 'light') {
      color = "#2176a3"; // Darker Blue for Light mode
    }
    
    return {
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 150,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: color,
        },
        links: {
          color: color,
          distance: 150,
          enable: true,
          opacity: 0.4,
          width: 1,
        },
        move: {
          direction: MoveDirection.none,
          enable: true,
          outModes: {
            default: OutMode.bounce,
          },
          random: false,
          speed: 2,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: 80,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 3 },
        },
      },
      detectRetina: true,
    };
  });

  async particlesInit(engine: Engine): Promise<void> {
    await loadFull(engine);
  }
}
