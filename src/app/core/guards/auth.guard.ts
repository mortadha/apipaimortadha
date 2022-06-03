import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '@app/core/services/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // Check for expiration date of jwt token
    const user = this.userService.getCurrentUser();
    if (route.data.expectedRole) {
      if (this.userService.isAuthenticatedAs(route.data.expectedRole)) {
        return true;
      }
    } else {
      if (this.userService.isAuthenticated()) {
        return true;
      }
    }
    this.router.navigate(['/auth/login'], {
      queryParams: {
        returnUrl: state.url,
      },
    });
    return false;
  }
}
