import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
/**
 * Angular http interceptor used display error messages on the UI
 */
@Injectable({
  providedIn: 'root'
})
export class ServerErrorsInterceptor implements HttpInterceptor {
    constructor() {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
        catchError((error: HttpErrorResponse) => {
            // log errors, show error messajes, render error in form controls, etc
            return throwError(error);
        }));
    }
}
