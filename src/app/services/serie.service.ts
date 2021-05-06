import { Injectable } from '@angular/core';
import { QueryStringParameters } from '../helper/query-string-parameters';
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
}
