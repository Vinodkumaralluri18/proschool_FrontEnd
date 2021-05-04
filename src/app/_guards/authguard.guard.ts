import { Injectable } from "@angular/core";
import {
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthenticationServiceService } from "../_services/authentication-service.service";
import { AuthorizationService } from "../_services/authorization.service";

@Injectable({
  providedIn: "root",
})
export class AuthguardGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private authorizationService: AuthorizationService,
    private authenticationService: AuthenticationServiceService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      return this.userAuth(next);
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      return this.userAuth(next);
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.userAuth(route);
  }

  userAuth(route: Route | ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean  {
    const user = this.authenticationService.userValue;
    if (user) {
      // check if route is restricted by role
      if (route.data.roles && route.data.roles.indexOf(user.role) === -1) {
        // role not authorised so redirect to home page
        this.router.navigate(["/"]);
        return false;
      }

      // authorised so return true
      return true;
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login']);
    return false;
  }
}
