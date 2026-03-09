import { Component, inject, signal } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-skills',
  template: `
    <div class="page-container">
        <section id="skills" class="fade-in visible">
            <div class="container">
                <div class="section-header">
                    <h2>{{ t().skills.title }}</h2>
                    <p>{{ t().skills.subtitle }}</p>
                </div>
                <div class="skills-container">
                    <div class="skills-header">
                        <button class="skill-filter" [class.active]="activeFilter() === 'all'" (click)="setFilter('all')">{{ t().skills.filters.all }}</button>
                        <button class="skill-filter" [class.active]="activeFilter() === 'backend'" (click)="setFilter('backend')">Backend</button>
                        <button class="skill-filter" [class.active]="activeFilter() === 'frontend'" (click)="setFilter('frontend')">Frontend</button>
                        <button class="skill-filter" [class.active]="activeFilter() === 'database'" (click)="setFilter('database')">{{ t().skills.filters.database }}</button>
                        <button class="skill-filter" [class.active]="activeFilter() === 'soft'" (click)="setFilter('soft')">{{ t().skills.filters.soft }}</button>
                    </div>
                    <div class="skills-grid">
                        @if (activeFilter() === 'all' || activeFilter() === 'backend') {
                        <div class="skill-category fade-item visible">
                            <h3><i class="fas fa-server"></i> {{ t().skills.categories.backend }}</h3>
                            <div class="skill-tags">
                                <span class="skill-tag"><i class="fab fa-microsoft"></i> C#</span>
                                <span class="skill-tag"><i class="fab fa-microsoft"></i> ASP.NET Core</span>
                                <span class="skill-tag"><i class="fas fa-cloud"></i> Web APIs</span>
                                <span class="skill-tag"><i class="fas fa-database"></i> Entity Framework Core</span>
                                <span class="skill-tag"><i class="fas fa-code"></i> LINQ</span>
                                <span class="skill-tag"><i class="fas fa-cube"></i> OOP</span>
                                <span class="skill-tag"><i class="fas fa-shield-alt"></i> IdentityServer4</span>
                                <span class="skill-tag"><i class="fas fa-tachometer-alt"></i> Performance Optimization</span>
                            </div>
                        </div>
                        }
                        @if (activeFilter() === 'all' || activeFilter() === 'frontend') {
                        <div class="skill-category fade-item visible">
                            <h3><i class="fas fa-laptop-code"></i> {{ t().skills.categories.frontend }}</h3>
                            <div class="skill-tags">
                                <span class="skill-tag"><i class="fab fa-html5"></i> HTML5</span>
                                <span class="skill-tag"><i class="fab fa-css3-alt"></i> CSS3</span>
                                <span class="skill-tag"><i class="fab fa-js"></i> JavaScript</span>
                                <span class="skill-tag"><i class="fab fa-bootstrap"></i> Bootstrap</span>
                                <span class="skill-tag"><i class="fas fa-mobile-alt"></i> Responsive Design</span>
                                <span class="skill-tag"><i class="fas fa-palette"></i> UI/UX Principles</span>
                            </div>
                        </div>
                        }
                        @if (activeFilter() === 'all' || activeFilter() === 'database') {
                        <div class="skill-category fade-item visible">
                            <h3><i class="fas fa-database"></i> {{ t().skills.categories.database }}</h3>
                            <div class="skill-tags">
                                <span class="skill-tag"><i class="fas fa-database"></i> Microsoft SQL Server</span>
                                <span class="skill-tag"><i class="fas fa-code"></i> T-SQL</span>
                                <span class="skill-tag"><i class="fas fa-project-diagram"></i> Database Design</span>
                                <span class="skill-tag"><i class="fas fa-tachometer-alt"></i> Query Optimization</span>
                                <span class="skill-tag"><i class="fas fa-shield-alt"></i> Data Security</span>
                                <span class="skill-tag"><i class="fas fa-sync-alt"></i> Dapper</span>
                            </div>
                        </div>
                        }
                        @if (activeFilter() === 'all' || activeFilter() === 'soft') {
                        <div class="skill-category fade-item visible">
                            <h3><i class="fas fa-heart"></i> {{ t().skills.categories.soft }}</h3>
                            <div class="skill-tags">
                                <span class="skill-tag"><i class="fas fa-brain"></i> Problem-Solving</span>
                                <span class="skill-tag"><i class="fas fa-comments"></i> Communication</span>
                                <span class="skill-tag"><i class="fas fa-exchange-alt"></i> Adaptability</span>
                                <span class="skill-tag"><i class="fas fa-clock"></i> Time Management</span>
                                <span class="skill-tag"><i class="fas fa-lightbulb"></i> Critical Thinking</span>
                                <span class="skill-tag"><i class="fas fa-users"></i> Team Collaboration</span>
                                <span class="skill-tag"><i class="fas fa-tasks"></i> Agile Methodologies</span>
                            </div>
                        </div>
                        }
                    </div>
                </div>
            </div>
        </section>
    </div>
  `
})
export class SkillsComponent {
  ts = inject(TranslationService);
  t = this.ts.t;
  activeFilter = signal('all');

  setFilter(filter: string) {
    this.activeFilter.set(filter);
  }
}
