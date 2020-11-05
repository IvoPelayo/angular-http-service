import { HttpMethods } from '../enums/http-methods';

export interface HttpCallParams {
    method: HttpMethods;
    url: string;
    params?: any; // queryStringParams
    body?: any;
    options?: any; // httpOptions
}
