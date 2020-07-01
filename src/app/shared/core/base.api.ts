import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class BaseApi {

  public static baseURL = 'http://localhost:8085/api/';

  constructor(public http: HttpClient) {
  }


  public static getUrl(url: string = '') {
    return BaseApi.baseURL + url;
  }

  public get(url: string = ''): Observable<any> {
    const heads = new HttpHeaders({
      Accept: 'application/x-spring-data-verbose+json'
    });
    return this.http.get(BaseApi.getUrl(url));
  }

  public post(url: string = '', data: any = {}): Observable<any> {
    return this.http.post(BaseApi.getUrl(url), data);
  }


  public put(url: string = '', data: any = {}): Observable<any> {
    return this.http.put(BaseApi.getUrl(url), data);
  }
}
