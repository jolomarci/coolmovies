// Angular Modules
import { Injectable } from '@angular/core';
// Application Classes
import { UrlBuilder } from '../helper/url-builder';
import { QueryStringParameters } from '../helper/query-string-parameters';

@Injectable({ providedIn: 'root' })
// Returns the api endpoints urls to use in services in a consistent way
export class ApiEndpointsService {
  public readonly API_ENDPOINT = 'https://api.trakt.tv';

  /* #region URL CREATOR */
  // URL
  public createUrl(action: string): string {
    const urlBuilder: UrlBuilder = new UrlBuilder(this.API_ENDPOINT, action);
    return urlBuilder.toString();
  }

  // URL WITH QUERY PARAMS
  public createUrlWithQueryParameters(
    action: string,
    queryStringHandler?: (queryStringParameters: QueryStringParameters) => void
  ): string {
    const urlBuilder: UrlBuilder = new UrlBuilder(this.API_ENDPOINT, action);
    // Push extra query string params
    if (queryStringHandler) {
      queryStringHandler(urlBuilder.queryString);
    }
    return urlBuilder.toString();
  }

  // URL WITH PATH VARIABLES
  public createUrlWithPathVariables(
    action: string,
    pathVariables: any[] = []
  ): string {
    let encodedPathVariablesUrl: string = '';
    // Push extra path variables
    for (const pathVariable of pathVariables) {
      if (pathVariable !== null) {
        encodedPathVariablesUrl += `/${encodeURIComponent(
          pathVariable.toString()
        )}`;
      }
    }
    const urlBuilder: UrlBuilder = new UrlBuilder(
      this.API_ENDPOINT,
      `${action}${encodedPathVariablesUrl}`
    );
    return urlBuilder.toString();
  }
  /* #endregion */
}