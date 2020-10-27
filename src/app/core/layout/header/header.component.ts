import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../auth/authorization/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  onLogOut(): void {
    this.authService.logout();
    // this.router.navigate['/home/welcome'];
  }
}
