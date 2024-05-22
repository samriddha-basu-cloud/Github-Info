// src/app/app.component.ts
import { Component } from '@angular/core';
import { GithubService } from './github.service';
import { Repo } from './models/repo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  repositories: Repo[] = [];
  loading: boolean = false;
  errorMessage: string = '';
  userProfile: any = null;
  searchFailed: boolean = false; // New property to track search failure

  constructor(private githubService: GithubService) {}

  handleSearchResult(result: any) {
    this.userProfile = result.userInfo;
    this.repositories = result.repos;
    this.searchFailed = false; // Reset search failure flag on successful search
  }

  handleSearchFailed() {
    this.searchFailed = true; // Set search failure flag
  }
}
