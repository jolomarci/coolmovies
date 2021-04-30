// Angular Modules
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// RxJs
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiHttpService {
  constructor(
    // Angular Modules
    private http: HttpClient
  ) {}

  private CLIENT_ID =
    'bba085514c7ed2f762ba673a5163de8b6d2685166d74d6dab41c3a6c7e35a611';
  private CLIENT_SECRET =
    'bf4ef64600ac03cd6d4c54ade5cf0113847edc141bb920653dba7534696b1ee3';

  private ACCESS_TOKEN = 'access-token';

  public get = (url: string, options?: any): Observable<any> =>
    this.http.get(url, options);

  public post = (url: string, data: any, options?: any): Observable<any> =>
    this.http.post(url, data, options);

  public put = (url: string, data: any, options?: any): Observable<any> =>
    this.http.put(url, data, options);

  public delete = (url: string, options?: any): Observable<any> =>
    this.http.delete(url, options);
}
