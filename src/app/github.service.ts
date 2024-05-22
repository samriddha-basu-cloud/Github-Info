// src/app/github.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private baseUrl: string = 'https://api.github.com/users';

  constructor(private http: HttpClient) {}

  getUserInfo(username: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${username}`).pipe(
      catchError(this.handleError)
    );
  }

  getUserRepos(username: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${username}/repos`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
