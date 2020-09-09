import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/auth/authorization/auth.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  constructor(private authService: AuthenticationService) {}
  isLoggedIn: boolean;
  roles = [];
  currentUser = {};
  ngOnInit(): void {
    this.getLogged();
  }
  logout() {
    this.authService.logout();
    location.reload();
  }

  getLogged() {
    this.roles = this.authService.getCurrentRoles();
    this.isLoggedIn = this.authService.isLoggedIn();
    this.currentUser = this.authService.getCurrentUser();
  }

  test() {
    console.log(this.authService.getCurrentRoles());
  }
}
