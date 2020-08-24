import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { QuestionnaireService } from './../../../core/services/questionnaire/questionnaire.service';
import { Questionnaire } from '../../models/questionnaire';

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.scss'],
})
export class CreateSurveyComponent implements OnInit {
  @Output()
  questionnaireAdded: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private questionnaireService: QuestionnaireService) {}

  ngOnInit(): void {}

  addQuestionnaire(): void {
    const sampleQuestionnaire = new Questionnaire(
      null,
      'Sample Questionnaire',
      new Date(),
      null,
      []
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
