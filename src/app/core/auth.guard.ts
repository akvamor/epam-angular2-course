import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import { AuthService } from './auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.user.take(1).map(user => !!user)
      .do((isAuthorizade) => this.activationCheck(isAuthorizade));
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.user.take(1).map(user => !!user)
      .do((isAuthorizade) => this.activationCheck(isAuthorizade));
  }

  private activationCheck(isAuthorizade) {
    if (!isAuthorizade) {
      this.router.navigate(['/login']);
    }
  }
}
