import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { OverviewComponent } from './components/overview/overview.component';
import { NewQuestionnaireComponent } from './components/new-questionnaire/new-questionnaire.component';
import { TemplatesComponent } from './components/templates/templates.component';
import { RoleGuard } from 'src/app/core/auth/authorization/role-guard';
import { PublicTemplatesComponent } from './components/templates/public-templates/public-templates.component';
import { PrivateTemplatesComponent } from './components/templates/private-templates/private-templates.component';

const homeRoutes: Routes = [
  {
    path: '',
    component: HomepageComponent,
    children: [
      { path: 'welcome', component: LandingPageComponent },
      {
        path: 'overview',
        component: OverviewComponent,
        canActivate: [RoleGuard],
        data: { expectedRoles: ['ROLE_USER'] },
      },
      {
        path: 'overview/:id',
        component: NewQuestionnaireComponent,
        canActivate: [RoleGuard],
        data: { expectedRoles: ['ROLE_USER'] },
      },
      {
        path: 'templates',
        component: TemplatesComponent,
        canActivate: [RoleGuard],
        data: { expectedRoles: ['ROLE_USER'] },
        children: [
          { path: 'public', component: PublicTemplatesComponent },
          { path: 'private', component: PrivateTemplatesComponent },
        ],
      },
      { path: '**', redirectTo: '/home/welcome', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(homeRoutes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
export const homeRouting: ModuleWithProviders<any> = RouterModule.forChild(
  homeRoutes
);
