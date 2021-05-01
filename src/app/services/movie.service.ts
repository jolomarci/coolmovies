import { Movie } from '../models/movie';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiHttpService } from './api-http.service';
import { ApiEndpointsService } from './api-endpoints.service';
import { AuthService } from './auth.service';
import { Page } from '../models/page';

@Injectable({ providedIn: 'root' })
export class MovieService {
  private page: Observable<Page>;
  private movies: Observable<Movie[]>;

  constructor(
    private http: ApiHttpService,
    private http2: HttpClient,
    private endpoint: ApiEndpointsService,
    private auth: AuthService
  ) {}

  getPopularMovies(): Observable<Movie[]> {
    this.http
      .get(this.endpoint.createUrl('movie/popular'), this.auth.getHeaders())
      .subscribe((data) => (this.movies = of(data.results)));
    return this.movies;
  }

  getMoviePosterLink(imageId: string, size: string): string {
    return this.endpoint.createImageUrl(imageId, size);
  }
}
