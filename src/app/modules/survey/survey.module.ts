import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurveyComponent } from './survey.component';
import { surveyRouting } from './survey-routing.module';
import { FillingSurveyComponent } from './components/filling-survey/filling-survey.component';
@NgModule({
  declarations: [SurveyComponent, FillingSurveyComponent],
  imports: [CommonModule, surveyRouting],
})
export class SurveyModule {}
