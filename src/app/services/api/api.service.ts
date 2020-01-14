import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {SessionService} from '../session/session.service';

export type requestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
export interface ApiRequestInit extends RequestInit {
  avoidAuth?: boolean;
}
export class ApiResponseError extends Error {
  constructor(public response: Response) {
    super(response.statusText);
  }
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private session: SessionService) { }

  public get(endpoint: string, apiRequestInit?: ApiRequestInit): Promise<Response> {
    return this.makeRequest(endpoint, {...apiRequestInit, method: 'GET'});
  }

  public post(endpoint: string, apiRequestInit?: ApiRequestInit): Promise<Response> {
    return this.makeRequest(endpoint, {...apiRequestInit, method: 'POST'});
  }

  public put(endpoint: string, apiRequestInit?: ApiRequestInit): Promise<Response> {
    return this.makeRequest(endpoint, {...apiRequestInit, method: 'PUT'});
  }

  public patch(endpoint: string, apiRequestInit?: ApiRequestInit): Promise<Response> {
    return this.makeRequest(endpoint, {...apiRequestInit, method: 'PATCH'});
  }

  public delete(endpoint: string, apiRequestInit?: ApiRequestInit): Promise<Response> {
    return this.makeRequest(endpoint, {...apiRequestInit, method: 'DELETE'});
  }

  public async makeRequest(endpoint: string, apiRequestInit?: ApiRequestInit): Promise<Response> {
    const url = environment.apiPath + endpoint;
    const requestInit = {
      ...apiRequestInit,
      headers: this.getApiHeaders(apiRequestInit)
    };
    const request = new Request(url, requestInit);
    const response = await fetch(request);
    if (response.status >= 400) { throw new ApiResponseError(response); }
    return response;
  }

  public toFormData(body: {[attribute: string]: any}): FormData  {
    return Object.keys(body).reduce((formData: FormData, key) => {
      formData.append(key, body[key]);
      return formData;
    }, new FormData());
  }

  private getApiHeaders({avoidAuth, headers}: ApiRequestInit) {
    return new Headers({
      ApiKey: environment.apiKey,
      auth: avoidAuth ? null : this.session.getAuth(),
      ...this.getHeadersObject(new Headers(headers))
    });
  }

  private getHeadersObject(headers: Headers): {[attribute: string]: any} {
    let headersObject = {

    };
    headers.forEach((value, key) => headersObject = {...headersObject, [key]: value});
    return headersObject;
  }
}
