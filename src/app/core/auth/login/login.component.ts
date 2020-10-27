import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../authorization/auth.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {}

  onLogin(email: string, password: string) {
    this.authService.login(email, password);
  }
}
