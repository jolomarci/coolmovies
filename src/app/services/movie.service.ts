import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiHttpService } from './api-http.service';
import { ApiEndpointsService } from './api-endpoints.service';
import { AuthService } from './auth.service';
import { Page } from '../models/page';
import { QueryStringParameters } from '../helper/query-string-parameters';
import { SingleMovie } from '../models/single-movie';

@Injectable()
export class MovieService {
  constructor(
    private http: ApiHttpService,
    private endpoint: ApiEndpointsService,
    private auth: AuthService
  ) {}

  public getMovies(pageNumber: number, action: string): Observable<Page> {
    return this.http.get(
      this.endpoint.createUrlWithQueryParameters(
        'movie/' + action,
        (qs: QueryStringParameters) => qs.push('page', pageNumber)
      ),
      this.auth.getHeaders()
    );
  }

  public searchMovies(pageNumber: number, searchText: string) {
    return this.http.get(
      this.endpoint.createUrlWithQueryParameters(
        'search/movie',
        (qs: QueryStringParameters) => {
          qs.push('page', pageNumber);
          qs.push('query', searchText);
        }
      ),
      this.auth.getHeaders()
    );
  }

  public getMoviesByGenre(
    pageNumber: number,
    genreId: string
  ): Observable<Page> {
    return this.http.get(
      this.endpoint.createUrlWithQueryParameters(
        'discover/movie',
        (qs: QueryStringParameters) => {
          qs.push('sort_by', 'popularity.desc');
          qs.push('page', pageNumber);
          qs.push('with_genres', genreId);
        }
      ),
      this.auth.getHeaders()
    );
  }

  public getCast(id: number) {
    return this.http.get(
      this.endpoint.createUrl('movie/' + id + '/credits'),
      this.auth.getHeaders()
    );
  }

  public getMovieById(id: number): Observable<SingleMovie> {
    return this.http.get(
      this.endpoint.createUrlWithPathVariables('movie', [id]),
      this.auth.getHeaders()
    );
  }

  /**
   * Forwards occuring error to request handler
   * @param error
   */
  public handleError(error) {
    this.http.handleError(error);
  }
}
