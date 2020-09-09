import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './core/auth/login/login.component';
import { RegisterComponent } from './core/auth/register/register.component';
import { RoleGuard } from './../app/core/auth/authorization/role-guard';

const routes: Routes = [
  { path: 'home', loadChildren: './modules/home/home.module#HomeModule' },
  {
    path: 'surveys',
    loadChildren: './modules/survey/survey.module#SurveyModule',
    canActivate: [RoleGuard],
    data: { expectedRoles: ['USER'] },
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
