import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Questionnaire } from '../../models/questionnaire';
import { QuestionnaireService } from 'src/app/core/services/questionnaire/questionnaire.service';
@Component({
  selector: 'app-displayed-survey',
  templateUrl: './displayed-survey.component.html',
  styleUrls: ['./displayed-survey.component.scss'],
})
export class DisplayedSurveyComponent implements OnInit {
  @Input() questionnaire: Questionnaire;

  @Output()
  questionnaireDeleted: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private questionnaireService: QuestionnaireService) {}

  ngOnInit(): void {}

  deleteQuestionnaire(id: number): void {
    this.questionnaireService.deleteQuestionnaire(id).subscribe({
      complete: () => {
        this.buttonClicked();
      },
    });
  }

  copyQuestionnaire(questionnaire: Questionnaire): void {
    this.questionnaireService.copyQuestionnaire(questionnaire).subscribe({
      complete: () => {
        this.buttonClicked();
      },
    });
  }

  buttonClicked(): void {
    this.questionnaireDeleted.emit(true);
  }
}
