import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// with help from https://github.com/georgeroubie/Angular-API-calls-the-right-way

/**
 * Wrapper service for creating HTTP requests
 * this way you can return any type of Observable
 */
@Injectable({ providedIn: 'root' })
export class ApiHttpService {
  constructor(private http: HttpClient) {}

  public get = (url: string, options?: any): Observable<any> =>
    this.http.get(url, options);

  public post = (url: string, data: any, options?: any): Observable<any> =>
    this.http.post(url, data, options);

  public put = (url: string, data: any, options?: any): Observable<any> =>
    this.http.put(url, data, options);

  public delete = (url: string, options?: any): Observable<any> =>
    this.http.delete(url, options);

  /**
   * Logs errors
   * TODO: Show errors to users as well
   * @param error
   */
  public handleError(error) {
    console.log(error.status, error.error.status_message);
  }
}
