import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/shared/models/user';
import { AuthenticationService } from '../authorization/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private authService: AuthenticationService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  onRegister(form: NgForm): void {
    const formValue = form.value;
    const registeredUser: User = {
      id: 0,
      email: formValue.email,
      password: formValue.password,
      permission: {
        id: 1,
        authority: '',
      },
    };
    this.authService.register(registeredUser);
    this.toastr.show('Registered Successfully');
    // if (
    //   (formValue.firstname &&
    //     formValue.lastname &&
    //     formValue.usename &&
    //     formValue.email &&
    //     formValue.password) != undefined
    // ) {
    //   this.authService.register(registeredUser);
    // }
  }
}
