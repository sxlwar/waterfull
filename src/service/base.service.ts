import { Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';

export abstract class BaseService {
  protected url: string = 'https://pixabay.com/api/';

  private apiKey = '18822289-51f03033a17350dddff71ea70';

  protected urlWithQueryParams(params?: object): string {
    if (params) {
      const querying = Object.entries(params)
        .filter(([_, value]) => typeof value !== 'object')
        .map(
          ([key, value]) =>
            `${key}=${typeof value === 'boolean' ? value.toString() : value}`
        )
        .join('&');

      return `${this.url}?key=${this.apiKey}&${querying}`;
    } else {
      return `${this.url}?key=${this.apiKey}`;
    }
  }

  protected get<T>(
    url: string,
    options?: { params?: any },
    headers?: object
  ): Observable<T> {
    const address = !!options ? this.urlWithQueryParams(options!.params) : url;

    return ajax.getJSON(address, headers);
  }
}
