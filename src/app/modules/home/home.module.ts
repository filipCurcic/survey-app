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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './../../shared/pipes/filter/filter.pipe';
import { AlertComponent } from './../../shared/components/alert/alert.component';
import { PublicTemplatesComponent } from './components/templates/public-templates/public-templates.component';
import { PrivateTemplatesComponent } from './components/templates/private-templates/private-templates.component';

@NgModule({
  imports: [
    CommonModule,
    homeRouting,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    LandingPageComponent,
    HomepageComponent,
    OverviewComponent,
    NewQuestionnaireComponent,
    QuestionComponent,
    TemplatesComponent,
    FilterPipe,
    AlertComponent,
    PublicTemplatesComponent,
    PrivateTemplatesComponent,
  ],
})
export class HomeModule {}
