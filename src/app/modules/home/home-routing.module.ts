import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { OverviewComponent } from './components/overview/overview.component';
import { NewQuestionnaireComponent } from './components/new-questionnaire/new-questionnaire.component';
import { TemplatesComponent } from './components/templates/templates.component';

const homeRoutes: Routes = [
  {
    path: '',
    component: HomepageComponent,
    children: [
      { path: 'welcome', component: LandingPageComponent },
      { path: 'overview', component: OverviewComponent },
      { path: 'templates', component: TemplatesComponent },
      { path: 'new', component: NewQuestionnaireComponent },
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
