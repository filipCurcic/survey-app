import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  roleChanged = new Subject<any[]>();
  tokenChanged = new Subject<any[]>();
  loggedInStatusChanged = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  // tslint:disable-next-line:typedef
  login(em: string, pin: string) {
    this.http
      .post<{ accessToken: string }>('http://localhost:8080/login/', {
        email: em,
        password: pin,
      })
      .subscribe((response) => {
        if (response.accessToken) {
          localStorage.setItem('accessToken', response.accessToken);
          console.log(response.accessToken);
          this.roleChanged.next(this.getCurrentRoles());
          this.tokenChanged.next(this.getTokenExpired());
          this.router.navigate(['/home']);
          this.loggedInStatusChanged.next(true);
        }
      });
  }
  // tslint:disable-next-line:typedef
  logout() {
    this.roleChanged.next([]);
    localStorage.removeItem('accessToken');
    this.router.navigate(['/home']);
    this.loggedInStatusChanged.next(false);
  }
  // tslint:disable-next-line:typedef
  getCurrentRoles() {
    const accessToken = localStorage.getItem('accessToken');
    const roles = [];
    if (accessToken) {
      jwt_decode(accessToken).role.forEach((role) => {
        roles.push(role.authority);
      });
    }
    return roles;
  }
  // tslint:disable-next-line:typedef
  getCurrentUser() {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      return {
        email: jwt_decode(accessToken).uniq,
        id: jwt_decode(accessToken).sub,
      };
    }
    return null;
  }
  // tslint:disable-next-line:typedef
  getTokenExpired() {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      return jwt_decode(accessToken).exp;
    }

    return null;
  }
  // tslint:disable-next-line:typedef
  isLoggedIn() {
    if (localStorage.getItem('accessToken')) {
      return true;
    }
    return false;
  }
}
