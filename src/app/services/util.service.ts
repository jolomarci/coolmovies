import { Injectable } from '@angular/core';
import { ApiEndpointsService } from './api-endpoints.service';
import { ApiHttpService } from './api-http.service';

@Injectable()
export class UtilService {
  constructor(
    private http: ApiHttpService,
    private endpoint: ApiEndpointsService
  ) {}

  public checkPageParam(param: number): number {
    if (isNaN(param)) return 1;
    if (param < 0) return 1;
    //TODO if (param > this.maxPage) return false;
    else return param;
  }

  public getImage(imageId: string, size: string) {
    if (imageId == null) return 'assets/placeholder.png';
    else return this.endpoint.createImageUrl(imageId, size);
  }
}
