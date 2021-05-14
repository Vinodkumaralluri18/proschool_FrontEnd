import { Injectable } from "@angular/core";
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { AuthenticationServiceService } from "../_services/authentication-service.service";

@Injectable()
export class IsSignedInGuard implements CanActivate {
  // here you can inject your auth service to check that user is signed in or not
  constructor(
    private authService: AuthenticationServiceService,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const user = this.authService.userValue;
    if (user && user.role) {
      if (user.role === 'admin') {
        this.router.navigate(['/main/main']);
      } else if (user.role === 'teacher') {
        this.router.navigate(['/main/main/dashboard/teacherdashboard'])
      } else if (user.role === 'parent') {
        this.router.navigate(['/main/main/dashboard/parentdashboard'])
      }
      // window.location.reload();
      return false;
    }
    return true;
  }
}
