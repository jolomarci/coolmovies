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
import { Genre, SingleMovie } from '../models/single-movie';

@Injectable()
export class MovieService {
  private page: Observable<Page>;
  private movies: Observable<Movie[]>;

  constructor(
    private http: ApiHttpService,
    private endpoint: ApiEndpointsService,
    private auth: AuthService
  ) {}

  public getMovies(
    pageNumber: number,
    genre: string,
    sortBy: string
  ): Observable<Page> {
    return this.http.get(
      this.endpoint.createUrlWithQueryParameters(
        'discover/movie/',
        (qs: QueryStringParameters) => {
          qs.push('page', pageNumber);
          if (genre !== 'all') qs.push('with_genre', genre);
          qs.push('sort_by', sortBy + '.desc');
        }
      ),
      this.auth.getHeaders()
    );
  }

  public getMoviesByGenre(
    pageNumber: number = 1,
    genreName: string
  ): Observable<Page> {
    return this.http.get(
      this.endpoint.createUrlWithQueryParameters(
        'discover/movie/',
        (qs: QueryStringParameters) => {
          qs.push('page', pageNumber), qs.push('with_genre', genreName);
        }
      ),
      this.auth.getHeaders()
    );
  }

  public getMoviePosterLink(imageId: string, size: string): string {
    return this.endpoint.createImageUrl(imageId, size);
  }

  public getMovieById(id: number): Observable<SingleMovie> {
    return this.http.get(
      this.endpoint.createUrlWithPathVariables('movie', [id]),
      this.auth.getHeaders()
    );
  }

  public getIMDBLink(id: number): string {
    return this.endpoint.createIMDBUrl(id);
  }
}
