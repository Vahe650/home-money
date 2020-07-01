import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {User} from '../model/user.model';
import {BaseApi} from '../core/base.api';


@Injectable()
export class UserService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  getUserByEmail(email: string): Observable<User> {
    return this.get(`byEmail?email=${email}`);

  }


  login(email: string, password: string) {
    const heads = new HttpHeaders({
      'Content-Type': 'text/plain;charset=ISO-8859-1'
    });
    const data = {email, password};
    return this.http.post('http://localhost:8085/auth', data)
      .pipe(
        map((response: HttpResponse<any>) => {
          console.log(response);
          return response;
        }),
        catchError(err => {
          console.log(err['error']['text']);
          return throwError(err['error']['text']);
        })
      );
  }

  createUser(user: User): Observable<User> {
    return this.post('users', user);
  }
}
