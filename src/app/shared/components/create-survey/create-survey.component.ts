import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { QuestionnaireService } from './../../../core/services/questionnaire/questionnaire.service';
import { Questionnaire } from '../../models/questionnaire';
import { AuthenticationService } from 'src/app/core/auth/authorization/auth.service';

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.scss'],
})
export class CreateSurveyComponent implements OnInit {
  @Output()
  questionnaireAdded: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private questionnaireService: QuestionnaireService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {}

  addQuestionnaire(): void {
    const sampleQuestionnaire = new Questionnaire(
      null,
      'Sample Questionnaire',
      new Date(),
      {
        id: this.authService.getCurrentUser().id,
        email: this.authService.getCurrentUser().email,
        firstName: '',
        lastName: '',
        userName: '',
        password: '',
        permission: null,
      },
      [],
      false
    );
    this.questionnaireService.addQuestionnaire(sampleQuestionnaire).subscribe({
      complete: () => {
        this.buttonClicked();
      },
    });
  }

  buttonClicked(): void {
    this.questionnaireAdded.emit(true);
  }
}
