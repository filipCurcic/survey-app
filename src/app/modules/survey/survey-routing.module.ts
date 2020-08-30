import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SurveyComponent } from './survey.component';
import { FillingSurveyComponent } from './components/filling-survey/filling-survey.component';

const surveyRoutes: Routes = [
  {
    path: '',
    component: SurveyComponent,
    children: [{ path: ':id', component: FillingSurveyComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(surveyRoutes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
export const surveyRouting: ModuleWithProviders<any> = RouterModule.forChild(
  surveyRoutes
);
