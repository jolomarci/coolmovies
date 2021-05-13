import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * Helper Service for API authorization
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private ACCESS_TOKEN =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMWRjNjk5N2I5NjE0ZjU1ZGE1YjJmMjAyOTA0MDRhYiIsInN1YiI6IjYwOGQyMTk0YTYxZGUxMDAyOTFjNjc4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DnNX5yNFgRrBM3e3ZD7Ho8uHEJTSvrBAw0cWJ4lTU3E';

  /** required headers for API requests */
  private HEADERS = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.ACCESS_TOKEN,
    }),
  };

  public getHeaders() {
    return this.HEADERS;
  }
}
