import { HttpHeaders } from '@angular/common/http';
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
  private CODE = 'code';

  private HEADERS = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.ACCESS_TOKEN,
      'trakt-api-version': '2',
      'trakt-api-key': this.CLIENT_ID,
    }),
  };

  constructor(
    private http: ApiHttpService,
    private endpoint: ApiEndpointsService
  ) {}

  public getAuthorizationLink() {
    return this.endpoint.createUrlWithQueryParameters(
      'oauth/authorize',
      (qs: QueryStringParameters) => {
        qs.push('response_type', 'code');
        qs.push('client_id', this.CLIENT_ID);
        qs.push('redirect_uri', 'http://localhost:4200/');
      }
    );
  }

  public getAccessToken() {
    const body: JSON = <JSON>(<unknown>{
      code: this.CODE,
      client_id: this.CLIENT_ID,
      client_secret: this.CLIENT_SECRET,
      redirect_uri: 'http://localhost:4200/',
      grant_type: 'authorization_code',
    });

    this.http.post(this.endpoint.createUrl('oauth/token'), body).subscribe(
      (data) => {
        console.log('access_token: ' + data.access_token);
        this.ACCESS_TOKEN = data.access_token;
      },
      (error) => console.log('oops', error)
    );
  }

  public getHeaders() {
    return this.HEADERS;
  }

  public setCode(code: string) {
    this.CODE = code;
    console.log('code: ' + this.CODE);
  }
}
