import { Component } from '@angular/core';
import { ApiEndpoints } from './core/enums/endpoints';
import { HttpMethods } from './core/enums/http-methods';
import { HttpService } from './core/services/http-client/http.service';
import { ColorResponse } from './core/types/color-response';

/**
 * A few examples of usage, showing the uses of interceptors and stuff
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  colors: ColorResponse[] = [];
  constructor(private httpService: HttpService) {
  }

  getData() {
    this.httpService.call<ColorResponse[]>({
      url: ApiEndpoints.getExample,
      method: HttpMethods.GET,
    }).subscribe(res => {
      this.colors = res;
      setTimeout(() => {
        this.colors = [];
      }, 5000);
    });
  }

  throwError() {
    this.httpService.call<ColorResponse[]>({
      url: ApiEndpoints.errorExample,
      method: HttpMethods.GET,
    }).subscribe(res => {
      // This should retry a few times before throwing a console error;
    });
  }
}
