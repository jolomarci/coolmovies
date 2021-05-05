import { Movie } from '../models/movie';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiHttpService } from './api-http.service';
import { ApiEndpointsService } from './api-endpoints.service';
import { AuthService } from './auth.service';
import { Page } from '../models/page';
import { QueryStringParameters } from '../helper/query-string-parameters';
import { SingleMovie } from '../models/single-movie';

@Injectable()
export class MovieService {
  private page: Observable<Page>;
  private movies: Observable<Movie[]>;

  constructor(
    private http: ApiHttpService,
    private endpoint: ApiEndpointsService,
    private auth: AuthService
  ) {}

  getMovies(
    pageNumber: number = 1,
    type: string = 'popular'
  ): Observable<Page> {
    this.page = this.http.get(
      this.endpoint.createUrlWithQueryParameters(
        'movie/' + type,
        (qs: QueryStringParameters) => qs.push('page', pageNumber)
      ),
      this.auth.getHeaders()
    );
    return this.page;
  }

  getMoviePosterLink(imageId: string, size: string): string {
    //return this.endpoint.createImageUrl(imageId, size);
    return '/assets/avengers.jpg';
  }

  getMovieById(id: number): Observable<SingleMovie> {
    return this.http.get(
      this.endpoint.createUrlWithPathVariables('movie', [id]),
      this.auth.getHeaders()
    );
  }

  getIMDBLink(id: number): string {
    return this.endpoint.createIMDBUrl(id);
  }
}
