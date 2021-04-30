import { Injectable } from '@angular/core';
import { QueryStringParameters } from '../helper/query-string-parameters';
import { ApiEndpointsService } from './api-endpoints.service';
import { ApiHttpService } from './api-http.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private CLIENT_ID =
    'bba085514c7ed2f762ba673a5163de8b6d2685166d74d6dab41c3a6c7e35a611';
  private CLIENT_SECRET =
    'bf4ef64600ac03cd6d4c54ade5cf0113847edc141bb920653dba7534696b1ee3';
  private ACCESS_TOKEN = 'access-token';

  constructor(
    private http: ApiHttpService,
    private endpoint: ApiEndpointsService
  ) {}

  public authorizeApp() {
    console.log('helo');
    let response: Object;
    response = this.http.get(
      this.endpoint.createUrlWithQueryParameters(
        'oauth/authorize',
        (qs: QueryStringParameters) => {
          qs.push('response_type', 'code');
          qs.push('client_id', this.CLIENT_ID);
          qs.push('redirect_uri', '');
        }
      )
    );

    console.log(response);
  }
}
