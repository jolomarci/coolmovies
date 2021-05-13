import { Injectable } from '@angular/core';
import { UrlBuilder } from '../helper/url-builder';
import { QueryStringParameters } from '../helper/query-string-parameters';

// with help from https://github.com/georgeroubie/Angular-API-calls-the-right-way

/**
 * Service for creating URL's for API HTTP requests
 */
@Injectable({ providedIn: 'root' })
export class ApiEndpointsService {
  public readonly API_ENDPOINT = 'https://api.themoviedb.org/3';
  public readonly API_IMAGE_ENDPOINT = 'https://image.tmdb.org/t/p';
  public readonly IMDB_ENDPOINT = 'https://imdb.com/title';

  /**
   * Create simple URL for API requests
   * @param action e.g. '/movies'
   * @returns URL to send the request to
   */
  public createUrl(action: string): string {
    const urlBuilder: UrlBuilder = new UrlBuilder(this.API_ENDPOINT, action);
    return urlBuilder.toString();
  }

  /**
   * Create simple URL for API Image requests (different endpoint)
   * @param imageId
   * @param size size of the image, supported formats: 'original' or 'w500'
   * @returns URL to send the request to
   */
  public createImageUrl(imageId: string, size: string): string {
    const urlBuilder: UrlBuilder = new UrlBuilder(
      this.API_IMAGE_ENDPOINT,
      size + '/' + imageId
    );
    return urlBuilder.toString();
  }

  /**
   * Create IMDB URL to a movie or series
   * @param id
   * @returns IMDB URL
   */
  public createIMDBUrl(id: number): string {
    const urlBuilder: UrlBuilder = new UrlBuilder(
      this.IMDB_ENDPOINT,
      id.toString()
    );
    return urlBuilder.toString();
  }

  /**
   * Create an URL with custom query parameters
   * @param action e.g. '/movies'
   * @param queryStringHandler e.g. (qs: QueryStringParameters) => qs.push('page', pageNumber)
   * @returns URL with query parameters
   */
  public createUrlWithQueryParameters(
    action: string,
    queryStringHandler?: (queryStringParameters: QueryStringParameters) => void
  ): string {
    const urlBuilder: UrlBuilder = new UrlBuilder(this.API_ENDPOINT, action);
    if (queryStringHandler) {
      queryStringHandler(urlBuilder.queryString);
    }
    return urlBuilder.toString();
  }

  /**
   * Create URL with variables
   * @param action e.g. /movies
   * @param pathVariables e.g. [id]
   * @returns URL with variables
   */
  public createUrlWithPathVariables(
    action: string,
    pathVariables: any[] = []
  ): string {
    let encodedPathVariablesUrl: string = '';
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
}
