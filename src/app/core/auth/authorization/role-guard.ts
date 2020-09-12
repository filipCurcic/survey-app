import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const accessToken = localStorage.getItem('accessToken');
    let authorized = false;
    if (accessToken) {
      const tokenPayload = JSON.parse(atob(accessToken.split('.')[1]));
      const expectedRoles = route.data.expectedRoles;
      if (new Date(tokenPayload.created + tokenPayload.exp) > new Date()) {
        tokenPayload.role.forEach((auth) => {
          if (expectedRoles.includes(auth.authority)) {
            authorized = true;
          }
        });
      }
    }
    if (authorized) {
      return true;
    } else {
      if (accessToken) {
        this.router.navigate(['/']);
      } else {
        this.router.navigate(['login']);
      }
      return false;
    }
  }
}
