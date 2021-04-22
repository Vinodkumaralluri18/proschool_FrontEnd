import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// import { appConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {

  constructor(private http: HttpClient) { }
  
  // private url = appConfig.authenticationUrl;
  private url ='http://13.126.140.230:4005';
  // private url ='http://localhost:4005';

  login(dataValue: string): Observable<any> {
    return this.http.post<any>(this.url + '/signin', dataValue)
      .pipe(
        map(user => {
          if (user && user.token) {
            localStorage.setItem('currentUser', JSON.stringify(user));
          }
          return user;
        })
      )
  }

  register(data): Observable<any> {
    return this.http.post<any>(this.url + '/schools', data)
      .pipe(
        map(user => {
          if (user && user.token) {
            localStorage.setItem('currentUser', JSON.stringify(user));
          }
          return user;
        })
      )
  }

  logout(log_id): Observable<any> {
    var data = log_id

    console.log(data)
    return this.http.post<any>(this.url + '/logout', data)
      .pipe(
        map(res => {
          console.log(res)
          if (res === true) {
            localStorage.removeItem('currentUser');
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
