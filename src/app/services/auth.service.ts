import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QueryStringParameters } from '../helper/query-string-parameters';
import { ApiEndpointsService } from './api-endpoints.service';
import { ApiHttpService } from './api-http.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private ACCESS_TOKEN =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMWRjNjk5N2I5NjE0ZjU1ZGE1YjJmMjAyOTA0MDRhYiIsInN1YiI6IjYwOGQyMTk0YTYxZGUxMDAyOTFjNjc4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DnNX5yNFgRrBM3e3ZD7Ho8uHEJTSvrBAw0cWJ4lTU3E';

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
