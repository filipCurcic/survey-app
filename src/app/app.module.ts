import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FooterComponent } from './core/layout/footer/footer.component';
import { HeaderComponent } from './core/layout/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './core/auth/login/login.component';
import { RegisterComponent } from './core/auth/register/register.component';
import { HomepageComponent } from './modules/home/homepage.component';
import { HomeModule } from './modules/home/home.module';
import { CreateSurveyComponent } from './shared/components/create-survey/create-survey.component';
import { SharedModule } from './shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { answerReducer } from './core/services/answer/store/answer.reducer';
import { questionReducer } from './core/services/question/store/question.reducer';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    SharedModule,
    StoreModule.forRoot({ question: questionReducer }),

    StoreModule.forRoot({ answer: answerReducer }),
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
