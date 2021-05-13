import { Injectable } from '@angular/core';
import { ApiEndpointsService } from './api-endpoints.service';

/**
 * Handy utils used by many components
 */
@Injectable()
export class UtilService {
  constructor(private endpoint: ApiEndpointsService) {}

  /**
   * Checks the added page param int the URL, preventing wrong API requests
   * @param param
   * @returns
   */
  public checkPageParam(param: number): number {
    if (isNaN(param)) return 1;
    if (param < 0) return 1;
    else return param;
  }

  /**
   * Returns image URL's by id, if null returns placeholder image
   * @param imageId
   * @param size supported formats: 'original' or 'w500'
   * @returns image URL
   */
  public getImage(imageId: string, size: string) {
    if (imageId == null) return 'assets/placeholder.png';
    else return this.endpoint.createImageUrl(imageId, size);
  }

  /**
   * Returns IMDB URL's by content id
   * @param id
   * @returns IMDB URL
   */
  public getIMDBLink(id: number): string {
    return this.endpoint.createIMDBUrl(id);
  }

  /**
   * Returns correct date format in YYYY.MM.DD.
   * @param date unformatted date
   * @returns formatted date
   */
  public formatDate(date: string): string {
    let splitted = date.split('-');
    let formatted = '';
    splitted.forEach((value) => {
      formatted = formatted.concat(value + '. ');
    });
    return formatted;
  }
}
