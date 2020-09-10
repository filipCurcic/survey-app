import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const parsedToken = JSON.parse(atob(token.split('.')[1]));
      let authorized = false;
      console.log('token je: ' + token);
      if (token) {
        const expectedRoles = route.data.expectedRoles;
        console.log(expectedRoles);

        if (new Date(parsedToken.created + parsedToken.exp) > new Date()) {
          parsedToken.role.forEach((auth) => {
            if (expectedRoles.includes(auth.authority)) {
              authorized = true;
            }
          });
        }
      }
      if (authorized) {
        return true;
      } else {
        if (token) {
          this.router.navigate(['/']);
        } else {
          this.router.navigate(['login']);
        }
        return false;
      }
    }
  }
}
