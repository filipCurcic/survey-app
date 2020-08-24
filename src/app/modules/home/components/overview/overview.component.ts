import { Component, OnInit } from '@angular/core';
import { QuestionnaireService } from './../../../../core/services/questionnaire/questionnaire.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  constructor(private questionnaireService: QuestionnaireService) {}
  questionnaires = [];
  ngOnInit(): void {
    this.loadQuestionnaires();
  }

  loadQuestionnaires(): void {
    this.questionnaireService
      .getQuestionnaires()
      .subscribe((data) => (this.questionnaires = data));
  }

  updatedQuestionnaires(boolValue: boolean): void {
    if (boolValue) {
      this.loadQuestionnaires();
    }
  }
}
