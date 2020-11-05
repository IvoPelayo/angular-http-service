import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { InterceptorMockResponses } from './responses';

/**
 * Angular HttpInterceptor used to mock responses from the server.
 * Its only injected on the main module if environment.use_mock is set to true (local environment only)
 */
@Injectable()
export class HttpMockRequestInterceptor implements HttpInterceptor {
    constructor() {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        for (const element of InterceptorMockResponses) {
            if (request.url.indexOf(element.url) !== -1) {
                if (element.throwError) {
                    return throwError(new HttpResponse({ status: 500 }));
                }
                console.log('Loaded from mock : ' + request.url);
                return of(new HttpResponse({ status: 200, body: ((element.json) as any) }));
            }
        }
        return next.handle(request);
    }
}
