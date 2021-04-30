import { Movie } from '../models/movie';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiHttpService } from './api-http.service';
import { ApiEndpointsService } from './api-endpoints.service';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class MovieService {
  private movies: Movie[];

  constructor(
    private http: ApiHttpService,
    private endpoint: ApiEndpointsService,
    private auth: AuthService
  ) {}

  getPopularMovies(): Observable<Movie[]> {
    return this.http.get(
      this.endpoint.createUrl('movies/popular'),
      this.auth.getHeaders()
    );
  }
}
