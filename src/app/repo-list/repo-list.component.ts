// src/app/repo-list/repo-list.component.ts
import { Component, Input, OnInit, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Repo } from '../models/repo.model';

@Component({
  selector: 'app-repo-list',
  templateUrl: './repo-list.component.html',
  styleUrls: ['./repo-list.component.css']
})
export class RepoListComponent implements OnInit, OnChanges {
  @Input() repositories: Repo[] = [];
  @Input() loading: boolean = false;
  @Input() errorMessage: string = '';

  paginatedRepos: Repo[] = [];
  pageSize: number = 6;
  currentPage: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.updatePaginatedRepos();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['repositories']) {
      this.updatePaginatedRepos();
    }
  }

  updatePaginatedRepos() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedRepos = this.repositories.slice(startIndex, endIndex);
  }

  handlePageEvent(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.updatePaginatedRepos();
  }
}
