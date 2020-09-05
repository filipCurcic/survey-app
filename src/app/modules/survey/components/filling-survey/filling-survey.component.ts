import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionnaireService } from 'src/app/core/services/questionnaire/questionnaire.service';
import { Questionnaire } from 'src/app/shared/models/questionnaire';
import { Answer } from 'src/app/shared/models/answer';
import { analyzeAndValidateNgModules } from '@angular/compiler';

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

  chosenAnswer: boolean;

  ngOnInit(): void {
    this.loadQuestionnaire();
    console.log(this.loadQuestionnaire);
  }

  loadQuestionnaire(): void {
    this.questionnaireService
      .getQuestionnaire(+this.route.snapshot.paramMap.get('id'))
      .subscribe(
        (data) => (
          (this.loadedQuestionnaire = data),
          (this.loadedQuestionnaire.question = this.loadedQuestionnaire.question.map(
            (obj) => ({ ...obj, visible: true })
          ))
        )
      );
  }

  test() {
    console.log(this.loadedQuestionnaire.question);
  }

  onSaveAnswerChange(answerPar: Answer) {
    console.log(answerPar.name);
    for (let question of this.loadedQuestionnaire.question) {
      if (question.requiredAnswerId === answerPar.id) {
        if (question['visible']) {
          question['visible'] = false;
        } else {
          question['visible'] = true;
        }
      }
    }
  }
}
