import { environment } from 'src/environments/environment';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpMockRequestInterceptor } from './backend/http.backend.interceptor.mock';
import { ServerErrorsInterceptor } from './server-errors/server-errors.interceptor';

const mockInterceptors = [];
if (environment.use_mock) {
  mockInterceptors.push({
    provide: HTTP_INTERCEPTORS,
    useClass: HttpMockRequestInterceptor,
    multi: true
  });
}

export const AppInterceptors = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: ServerErrorsInterceptor,
        multi: true
    },
    ...mockInterceptors,
];




