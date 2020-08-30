import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionnaireService } from 'src/app/core/services/questionnaire/questionnaire.service';
import { Questionnaire } from 'src/app/shared/models/questionnaire';

@Component({
  selector: 'app-filling-survey',
  templateUrl: './filling-survey.component.html',
  styleUrls: ['./filling-survey.component.scss'],
})
export class FillingSurveyComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private questionnaireService: QuestionnaireService
  ) {}

  loadedQuestionnaire: Questionnaire;

  ngOnInit(): void {
    this.loadQuestionnaire();
    console.log(this.loadQuestionnaire);
  }

  loadQuestionnaire(): void {
    this.questionnaireService
      .getQuestionnaire(+this.route.snapshot.paramMap.get('id'))
      .subscribe((data) => (this.loadedQuestionnaire = data));
  }
}
