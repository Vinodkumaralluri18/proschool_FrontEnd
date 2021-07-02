import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';
import { Router } from '@angular/router';
// import { appConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {
  
  public userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  public user: Observable<User> = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
  }
  
  // private url = appConfig.authenticationUrl;
  private url ='https://api.proschool.in';
  // private url ='http://localhost:4005';

  login(dataValue: string): Observable<any> {
    return this.http.post<any>(this.url + '/signin', dataValue)
      .pipe(
        map(user => {
          if (user && user.token) {
            if(!this.splitToken(user.token).expires_in) {
              user.expires_in = 86400
            }
            localStorage.setItem('currentUser', JSON.stringify(user));
            localStorage.setItem('logged_in', 'true');
            this.userSubject.next(user);
          }
          return user;
        })
      )
  }

  splitToken(token) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  register(data): Observable<any> {
    return this.http.post<any>(this.url + '/schools', data)
      .pipe(
        map(user => {
          if (user && user.token) {
            if(!user.expires_in) {
              user.expires_in = 86400
            }
            localStorage.setItem('currentUser', JSON.stringify(user));
            localStorage.setItem('logged_in', 'true');
            this.userSubject.next(user);
          }
          return user;
        })
      )
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  public setUserValue(value) {
    this.userSubject.next(value);
  }

  logout(log_id): Observable<any> {
    var data = log_id
    this.userSubject.next(null);
    localStorage.removeItem('currentUser');
    localStorage.setItem('logged_in', null);

    console.log(data)
    return this.http.post<any>(this.url + '/logout', data)
      .pipe(
        map(res => {
          console.log(res)
          if (res === true) {
            localStorage.removeItem('currentUser');
            this.userSubject.next(null);
          }
          return res
        })
      )
  }

  forgot_password(dataValue: string): Observable<any> {
    return this.http.post<any>(this.url + '/forgotpassword', dataValue);
  }

  verify_otp(dataValue: string): Observable<any> {
    return this.http.post<any>(this.url + '/checkEmailOTP', dataValue);
  }

  reset_password(dataValue: string): Observable<any> {
    return this.http.post<any>(this.url + '/resetpassword', dataValue);
  }

}
