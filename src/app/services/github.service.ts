import { Injectable, signal } from '@angular/core';

export interface GithubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
  updated_at: string;
  fork: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private readonly GITHUB_API_URL = 'https://api.github.com/users/shenoudatharwat0/repos?sort=updated&per_page=6';
  
  public repos = signal<GithubRepo[]>([]);
  public isLoading = signal<boolean>(false);
  public error = signal<string | null>(null);

  constructor() {}

  async fetchRecentRepos() {
    if (this.repos().length > 0) return; // Cache basically
    
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const response = await fetch(this.GITHUB_API_URL);
      if (!response.ok) throw new Error('Failed to fetch repositories');
      
      const data: GithubRepo[] = await response.json();
      // Filter out forks if preferred, or just keep them
      this.repos.set(data.filter(repo => !repo.fork));
    } catch (err: any) {
      console.error('GitHub API Error:', err);
      this.error.set('Could not load live GitHub projects.');
    } finally {
      this.isLoading.set(false);
    }
  }
}
