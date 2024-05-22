// src/app/user-input/user-input.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { GithubService } from '../github.service';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.css']
})
export class UserInputComponent {
  username: string = '';
  @Output() searchResult = new EventEmitter<any>();
  @Output() searchFailed = new EventEmitter<void>(); // New event for search failure

  constructor(private githubService: GithubService) {}

  search() {
    if (this.username.trim()) {
      this.githubService.getUserInfo(this.username).subscribe(
        (userInfo) => {
          this.githubService.getUserRepos(this.username).subscribe(
            (repos) => {
              this.searchResult.emit({ userInfo, repos });
            },
            (error) => {
              console.error('Error fetching user repositories:', error);
              this.searchFailed.emit(); // Emit search failure event
            }
          );
        },
        (error) => {
          console.error('Error fetching user info:', error);
          this.searchFailed.emit(); // Emit search failure event
        }
      );
    }
  }
}
