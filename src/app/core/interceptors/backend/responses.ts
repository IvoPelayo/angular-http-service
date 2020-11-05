import { ApiEndpoints } from '../../enums/endpoints';

export const InterceptorMockResponses: MockResponse[] = [
  {
    url: ApiEndpoints.getExample,
    json: [
      {
        color: 'red',
        value: '#f00'
      },
      {
        color: 'green',
        value: '#0f0'
      },
      {
        color: 'blue',
        value: '#00f'
      },
      {
        color: 'cyan',
        value: '#0ff'
      },
      {
        color: 'magenta',
        value: '#f0f'
      },
      {
        color: 'yellow',
        value: '#ff0'
      },
      {
        color: 'black',
        value: '#000'
      }
    ]
  },
  {
    url: ApiEndpoints.errorExample,
    throwError: true,
    json: null
  }
];

export interface MockResponse {
  url: string;
  json: any;
  throwError?: boolean;
}
