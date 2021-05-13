import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QueryStringParameters } from '../helper/query-string-parameters';
import { Season } from '../models/season';
import { Serie } from '../models/serie';
import { SingleSerie } from '../models/single-serie';
import { ApiEndpointsService } from './api-endpoints.service';
import { ApiHttpService } from './api-http.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class SerieService {
  constructor(
    private http: ApiHttpService,
    private endpoint: ApiEndpointsService,
    private auth: AuthService
  ) {}

  public getSeries(pageNumber: number, action: string) {
    return this.http.get(
      this.endpoint.createUrlWithQueryParameters(
        'tv/' + action,
        (qs: QueryStringParameters) => qs.push('page', pageNumber)
      ),
      this.auth.getHeaders()
    );
  }

  public searchSeries(pageNumber: number, searchText: string) {
    return this.http.get(
      this.endpoint.createUrlWithQueryParameters(
        'search/tv',
        (qs: QueryStringParameters) => {
          qs.push('page', pageNumber);
          qs.push('query', searchText);
        }
      ),
      this.auth.getHeaders()
    );
  }

  public getSeriesByGenre(pageNumber: number, genreId: string) {
    return this.http.get(
      this.endpoint.createUrlWithQueryParameters(
        'discover/tv',
        (qs: QueryStringParameters) => {
          qs.push('sort_by', 'popularity.desc');
          qs.push('page', pageNumber);
          qs.push('with_genres', genreId);
        }
      ),
      this.auth.getHeaders()
    );
  }

  public getSeasonCast(id: number, season: number) {
    return this.http.get(
      this.endpoint.createUrl('tv/' + id + '/season/' + season + '/credits'),
      this.auth.getHeaders()
    );
  }

  public getSerieById(id: number): Observable<SingleSerie> {
    return this.http.get(
      this.endpoint.createUrlWithPathVariables('tv', [id]),
      this.auth.getHeaders()
    );
  }

  public getSeasonById(serieId: number, seasonId: number): Observable<Season> {
    return this.http.get(
      this.endpoint.createUrlWithPathVariables('tv', [
        serieId,
        'season',
        seasonId,
      ]),
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

  public loadSeries() {
    return JSON.parse(localStorage.getItem('series'));
  }

  public saveSeries(serie: Serie) {
    let series: Serie[] = this.loadSeries();
    if (series == null) series = [];
    series.push(serie);
    localStorage.setItem('series', JSON.stringify(series));
  }
}
