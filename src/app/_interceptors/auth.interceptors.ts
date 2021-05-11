import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationServiceService } from '../_services/authentication-service.service';
import { Router } from '@angular/router';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationServiceService, private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        const user = this.authenticationService.userValue;
        const isLoggedIn = user && user.token;
        const re = /signin/gi;
        if (request.url.search(re) === -1 ) { 
            if(this.checkForTokenExpired(user.token, request.url)) {
                localStorage.clear();
                this.router.navigate(['/login']);
            }
            if (isLoggedIn) {
                // commenting bcoz of cors issues

                // request = request.clone({
                //     setHeaders: {
                //         //  Authorization: `Bearer ${user.token}` ,
                //          'Access-Control-Allow-Origin':'*',
                //          'Access-Control-Allow-Header':'Content-Type',
                //          'Content-Type': 'application/json',
                //          'Access-Control-Allow-Methods':'GET, POST, OPTIONS',
                //     }
                // });
                // console.log({request})

            }
        }
        return next.handle(request);
    }

    checkForTokenExpired(token: string, url): boolean {
        try {
            let user = JSON.parse(atob(token.split('.')[1]));
            let expirationTime = user.iat + ((this.authenticationService.userValue as any).expires_in * 1000);
            if(new Date().getTime() > expirationTime) {
                return true;
            }
            return false;
        } catch(err) {
            return true;
        }
    }
}
