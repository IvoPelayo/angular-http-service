import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpMethods } from '../../enums/http-methods';
import { retry } from 'rxjs/operators';
import { HttpCallParams } from '../../types/http-call-params';

/** Service used to do Http calls
 * - Unifies the request formats
 * - Added error catching and retry functionality
 */
@Injectable({ providedIn: 'root' })
export class HttpService {

  constructor(public http: HttpClient) { }

  public call<T = any>(request: HttpCallParams): Observable<T> {
    let response: Observable<T>;
    let attempts = 0;
    switch (request.method) {
      case HttpMethods.GET:
        attempts = 3;
        response = this.http.get<T>(request.url, this.getOptions(request.options, request.params));
        break;
      case HttpMethods.POST:
        response = this.http.post<T>(request.url, request.body, this.getOptions(request.options, request.params));
        break;
      case HttpMethods.PUT:
        response = this.http.put<T>(request.url, request.body, this.getOptions(request.options, request.params));
        break;
      case HttpMethods.DELETE:
        response = this.http.delete<T>(request.url, this.getOptions(request.options, request.params));
        break;
    }

    return response.pipe(
      retry(attempts)
    );
  }

  private getOptions(options: any = null, params: any = null): object {
    return {
      ...options,
      params,
      responseType: 'json',
      observe: 'body',
    };
  }
}

