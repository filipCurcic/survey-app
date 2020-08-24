import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Questionnaire } from 'src/app/shared/models/questionnaire';

@Injectable({
  providedIn: 'root',
})
export class QuestionnaireService {
  private questionnaireUrl = `http://localhost:8080/questionnaire/`;

  constructor(private httpClient: HttpClient) {}

  // tslint:disable-next-line:typedef
  getQuestionnaires() {
    return this.httpClient.get<Questionnaire[]>(this.questionnaireUrl + `all`);
  }
  // tslint:disable-next-line:typedef
  getQuestionnaire(questionnaireId: number) {
    return this.httpClient.get<Questionnaire>(
      this.questionnaireUrl + `${questionnaireId}`
    );
  }
  // tslint:disable-next-line:typedef
  addQuestionnaire(questionnaire: Questionnaire) {
    return this.httpClient.post<Questionnaire>(
      this.questionnaireUrl + `add`,
      questionnaire
    );
  }
  // tslint:disable-next-line:typedef
  addQuestionnaireFromTemplate(questionnaire: Questionnaire) {
    return this.httpClient.post<Questionnaire>(
      this.questionnaireUrl + `add_template`,
      questionnaire
    );
  }
  // tslint:disable-next-line:typedef
  deleteQuestionnaire(questionnaireId: number) {
    return this.httpClient.delete<number>(
      this.questionnaireUrl + `${questionnaireId}`
    );
  }
  // tslint:disable-next-line:typedef
  getLastQuestionnaire() {
    return this.httpClient.get<Questionnaire>(this.questionnaireUrl + `last`);
  }
  // tslint:disable-next-line:typedef
  updateQuestionnaire(questionnaire: Questionnaire, questionnaireId: number) {
    return this.httpClient.put<Questionnaire>(
      this.questionnaireUrl + `${questionnaireId}`,
      questionnaire
    );
  }
  // tslint:disable-next-line:typedef
  getTemplates() {
    return this.httpClient.get<Questionnaire[]>(
      this.questionnaireUrl + `templates`
    );
  }

  // tslint:disable-next-line:typedef
  copyQuestionnaire(questionnaire: Questionnaire) {
    return this.httpClient.post<Questionnaire>(
      this.questionnaireUrl + `copy_questionnaire`,
      questionnaire
    );
  }
}
