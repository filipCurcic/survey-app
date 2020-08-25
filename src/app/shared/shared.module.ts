import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateSurveyComponent } from './components/create-survey/create-survey.component';
import { DisplayedSurveyComponent } from './components/displayed-survey/displayed-survey.component';
// import { AlertComponent } from './components/alert/alert.component';
import { DisplayedTemplateComponent } from './components/displayed-template/displayed-template.component';
import { EditingSurveyComponent } from './components/editing-survey/editing-survey.component';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [
    CreateSurveyComponent,
    DisplayedSurveyComponent,
    // AlertComponent,
    DisplayedTemplateComponent,
    EditingSurveyComponent,
  ],
  exports: [
    CreateSurveyComponent,
    DisplayedSurveyComponent,
    DisplayedTemplateComponent,
  ],
  imports: [CommonModule, RouterModule],
})
export class SharedModule {}
