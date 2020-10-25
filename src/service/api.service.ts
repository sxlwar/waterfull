import { BehaviorSubject, EMPTY } from 'rxjs';
import { AjaxResponse } from 'rxjs/ajax';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, debounceTime, retry } from 'rxjs/operators';
import {
  imageAvailableParams,
  ImageSearchParams,
  ImageSearchResponse
} from './../model/image';
import { BaseService } from './base.service';

export interface IAjaxResponse<T> extends AjaxResponse {
  response: T;
}

export class Api extends BaseService {
  public query$: BehaviorSubject<string> = new BehaviorSubject('');

  public queryObs: Observable<string> = this.query$
    .asObservable()
    .pipe(debounceTime(500));

  private static _instance: Api;

  public getImages(
    query: string,
    page: number
  ): Observable<ImageSearchResponse> {
    return this.get<ImageSearchResponse>(this.url, {
      params: { ...this.str2Params(query), page },
    }).pipe(
      retry(2),
      catchError((error, _) => {
        console.warn(error);

        return EMPTY;
      })
    );
  }

  /**
   * @description Transform text to query params. Key-value pairs that do not meet the API will be ignored
   */
  private str2Params(query: string): ImageSearchParams {
    return query
      .split(' ')
      .map((subStr) => {
        if (subStr.includes(':')) {
          const index = subStr.indexOf(':'); // split at the first semicolon position, other semicolons as value.
          const key = subStr.substr(0, index);
          const value = subStr.substr(index + 1);

          return { [key]: value };
        } else {
          return { q: subStr };
        }
      })
      .filter((item) =>
        Object.entries(item).every(([key, value]) => {
          const availableValue = imageAvailableParams.get(key);
          return (
            imageAvailableParams.has(key) &&
            value !== '' &&
            (!availableValue || availableValue.includes(value))
          );
        })
      )
      .reduce((acc, cur) => ({ ...acc, ...cur }), {});
  }

  public static get instance(): Api {
    return this._instance || (this._instance = new this());
  }
}

export default Api.instance;
