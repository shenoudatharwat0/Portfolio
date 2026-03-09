import { Component, inject, signal } from '@angular/core';
import { TranslationService } from '../../services/translation.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  template: `
    <div class="page-container">
        <section id="contact" class="fade-in visible">
            <div class="container">
                <div class="section-header">
                    <h2>{{ t().contact.title }}</h2>
                    <p>{{ t().contact.subtitle }}</p>
                </div>
                <div class="contact-container">
                    <div class="contact-info">
                        <h3 class="contact-title">{{ t().contact.getInTouch }}</h3>
                        <p class="contact-text">{{ t().contact.desc }}</p>
                        
                        <div class="contact-methods">
                            <a href="mailto:Shenoudatharwat0@gmail.com" class="contact-card fade-item visible">
                                <div class="contact-icon"><i class="fas fa-envelope"></i></div>
                                <div>
                                    <h3>{{ t().contact.email }}</h3>
                                    <p>Shenoudatharwat0@gmail.com</p>
                                </div>
                            </a>
                            <a href="https://wa.me/201031660540" class="contact-card fade-item visible">
                                <div class="contact-icon"><i class="fas fa-phone"></i></div>
                                <div>
                                    <h3>{{ t().contact.whatsapp }}</h3>
                                </div>
                            </a>
                            <a href="https://www.linkedin.com/in/shenouda-tharwat-352146389" target="_blank" class="contact-card fade-item visible">
                                <div class="contact-icon"><i class="fab fa-linkedin-in"></i></div>
                                <div>
                                    <h3>LinkedIn</h3>
                                    <p>{{ t().contact.connect }}</p>
                                </div>
                            </a>
                            <a href="https://github.com/shenoudatharwat0" target="_blank" class="contact-card fade-item visible">
                                <div class="contact-icon"><i class="fab fa-github"></i></div>
                                <div>
                                    <h3>GitHub</h3>
                                    <p>{{ t().contact.viewGithub }}</p>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="contact-form fade-item visible">
                        <form [formGroup]="contactForm" (ngSubmit)="onSubmit()">
                            <div class="form-group">
                                <label for="name">{{ t().contact.form.name }}</label>
                                <input type="text" id="name" formControlName="name" class="form-control" required [placeholder]="t().contact.form.namePlaceholder">
                            </div>
                            <div class="form-group">
                                <label for="email">{{ t().contact.form.email }}</label>
                                <input type="email" id="email" formControlName="email" class="form-control" required [placeholder]="t().contact.form.emailPlaceholder">
                            </div>
                            <div class="form-group">
                                <label for="subject">{{ t().contact.form.subject }}</label>
                                <input type="text" id="subject" formControlName="subject" class="form-control" required [placeholder]="t().contact.form.subjectPlaceholder">
                            </div>
                            <div class="form-group">
                                <label for="message">{{ t().contact.form.message }}</label>
                                <textarea id="message" formControlName="message" class="form-control" required [placeholder]="t().contact.form.messagePlaceholder"></textarea>
                            </div>
                            
                            @if (statusMessage()) {
                                <div class="status-message" [class.success]="isSuccess()" [class.error]="!isSuccess()">
                                    {{ statusMessage() }}
                                </div>
                            }

                            <button type="submit" class="submit-btn" [disabled]="contactForm.invalid || isSubmitting()">
                                @if (isSubmitting()) {
                                    <i class="fas fa-spinner fa-spin"></i> Sending...
                                } @else {
                                    <i class="fas fa-paper-plane"></i> {{ t().contact.form.send }}
                                }
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </div>
  `,
  styles: [`
    .status-message {
        padding: 10px;
        margin-bottom: 15px;
        border-radius: 4px;
        font-size: 0.9rem;
    }
    .status-message.success {
        background-color: rgba(74, 222, 128, 0.1);
        color: #4ade80;
        border: 1px solid rgba(74, 222, 128, 0.2);
    }
    .status-message.error {
        background-color: rgba(248, 113, 113, 0.1);
        color: #f87171;
        border: 1px solid rgba(248, 113, 113, 0.2);
    }
  `]
})
export class ContactComponent {
  ts = inject(TranslationService);
  t = this.ts.t;
  fb = inject(FormBuilder);
  
  isSubmitting = signal(false);
  statusMessage = signal('');
  isSuccess = signal(false);

  contactForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
    message: ['', Validators.required]
  });

  async onSubmit() {
    if (this.contactForm.valid) {
      this.isSubmitting.set(true);
      this.statusMessage.set('');

      try {
        // Check if keys are configured (not placeholders)
        if (EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID' || 
            EMAILJS_TEMPLATE_ID === 'YOUR_TEMPLATE_ID' || 
            EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
            
          // Fallback to mailto if keys are not set
          console.warn('EmailJS keys not configured. Falling back to mailto.');
          this.fallbackToMailto();
          this.isSubmitting.set(false);
          return;
        }

        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            from_name: this.contactForm.value.name,
            from_email: this.contactForm.value.email,
            subject: this.contactForm.value.subject,
            message: this.contactForm.value.message,
            to_name: 'Shenouda Tharwat'
          },
          EMAILJS_PUBLIC_KEY
        );

        this.isSuccess.set(true);
        this.statusMessage.set('Message sent successfully!');
        this.contactForm.reset();
      } catch (error) {
        console.error('EmailJS Error:', error);
        this.isSuccess.set(false);
        this.statusMessage.set('Failed to send message. Please try again or use email directly.');
      } finally {
        this.isSubmitting.set(false);
      }
    }
  }

  fallbackToMailto() {
    const { name, email, subject, message } = this.contactForm.value;
    const myEmail = "Shenoudatharwat0@gmail.com";
    const emailBody = `Name: ${name}\nUser Email: ${email}\n\nMessage:\n${message}`;
    const url = `mailto:${myEmail}?subject=${encodeURIComponent(subject || '')}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = url;
    this.contactForm.reset();
  }
}
