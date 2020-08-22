import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { HomepageComponent } from './homepage.component';
import { homeRouting } from './home-routing.module';
import { OverviewComponent } from './components/overview/overview.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NewQuestionnaireComponent } from './components/new-questionnaire/new-questionnaire.component';
import { QuestionComponent } from './components/new-questionnaire/question/question.component';
import { TemplatesComponent } from './components/templates/templates.component';

@NgModule({
  declarations: [
    LandingPageComponent,
    HomepageComponent,
    OverviewComponent,
    NewQuestionnaireComponent,
    QuestionComponent,
    TemplatesComponent,
  ],
  imports: [CommonModule, homeRouting, SharedModule],
})
export class HomeModule {}
