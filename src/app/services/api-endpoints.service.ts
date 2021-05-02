// Angular Modules
import { Injectable } from '@angular/core';
// Application Classes
import { UrlBuilder } from '../helper/url-builder';
import { QueryStringParameters } from '../helper/query-string-parameters';

@Injectable({ providedIn: 'root' })
// Returns the api endpoints urls to use in services in a consistent way
export class ApiEndpointsService {
  public readonly API_ENDPOINT = 'https://api.themoviedb.org/3';
  public readonly API_IMAGE_ENDPOINT = 'https://image.tmdb.org/t/p';
  public readonly IMDB_ENDPOINT = 'https://imdb.com/title';

  /* #region URL CREATOR */
  // URL
  public createUrl(action: string): string {
    const urlBuilder: UrlBuilder = new UrlBuilder(this.API_ENDPOINT, action);
    return urlBuilder.toString();
  }

  public createImageUrl(imageId: string, size: string): string {
    const urlBuilder: UrlBuilder = new UrlBuilder(
      this.API_IMAGE_ENDPOINT,
      size + '/' + imageId
    );
    return urlBuilder.toString();
  }

  public createIMDBUrl(id: number): string {
    const urlBuilder: UrlBuilder = new UrlBuilder(
      this.IMDB_ENDPOINT,
      id.toString()
    );
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
