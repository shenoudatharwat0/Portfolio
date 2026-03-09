import { Component, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  template: `
    <section id="home" class="hero">
        <div class="container">
            <div class="hero-content">
                <div class="hero-text">
                    <h1>{{ t().home.name }}</h1>
                    <div class="subtitle-container">
                        <span class="subtitle">{{ currentRoleText() }}</span><span class="cursor"></span>
                    </div>
                    <p>{{ t().home.description }}</p>
                    <div class="cta-buttons">
                        <a routerLink="/projects" class="btn btn-primary"><i class="fas fa-briefcase"></i> {{ t().home.viewProjects }}</a>
                        <a routerLink="/contact" class="btn btn-secondary"><i class="fas fa-envelope"></i> {{ t().home.getInTouch }}</a>
                        <a href="assets/pdf/CV.pdf" download class="btn btn-download"><i class="fas fa-download"></i> {{ t().home.downloadResume }}</a>
                    </div>
                </div>
                <div class="hero-image">
                    <div class="profile-container">
                        <img src="assets/images/profile/shenouda.png" alt="Shenouda Tharwat" referrerPolicy="no-referrer" (error)="handleImageError($event)">
                    </div>
                </div>
            </div>
        </div>
    </section>
  `
})
export class HomeComponent implements OnInit, OnDestroy {
  ts = inject(TranslationService);
  t = this.ts.t;
  
  currentRoleText = signal('');
  private textIndex = 0;
  private charIndex = 0;
  private isDeleting = false;
  private timeoutId: ReturnType<typeof setTimeout> | undefined;

  ngOnInit() {
    this.type();
  }

  ngOnDestroy() {
    clearTimeout(this.timeoutId);
  }

  type = () => {
    const roles = this.t().home.roles;
    const currentText = roles[this.textIndex % roles.length];
    
    if (this.isDeleting) {
      this.currentRoleText.set(currentText.substring(0, this.charIndex - 1));
      this.charIndex--;
    } else {
      this.currentRoleText.set(currentText.substring(0, this.charIndex + 1));
      this.charIndex++;
    }

    let typeSpeed = this.isDeleting ? 50 : 100;

    if (!this.isDeleting && this.charIndex === currentText.length) {
      this.isDeleting = true;
      typeSpeed = 2000;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.textIndex++;
      typeSpeed = 500;
    }

    this.timeoutId = setTimeout(this.type, typeSpeed);
  }

  handleImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    // Fallback to avatar if local image is missing
    imgElement.src = "https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortFlat&accessoriesType=Prescription02&hairColor=Black&facialHairType=BeardLight&facialHairColor=Black&clotheType=Hoodie&clotheColor=PastelBlue&eyeType=Happy&eyebrowType=Default&mouthType=Smile&skinColor=Light";
  }
}
