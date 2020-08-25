import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from 'src/app/shared/models/question';
@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private httpClient: HttpClient) {}

  questionUrl = 'http://localhost:8080/question/';

  // tslint:disable-next-line:typedef
  getQuestions() {
    return this.httpClient.get<Question>(this.questionUrl + `all`);
  }

  // tslint:disable-next-line:typedef
  deleteQuestion(id: number) {
    return this.httpClient.delete<number>(this.questionUrl + `${id}`);
  }

  // tslint:disable-next-line:typedef
  getLastQuestion() {
    return this.httpClient.get<Question>(this.questionUrl + `last`);
  }

  // tslint:disable-next-line:typedef
  getQuestionsFromQuestionnaire(questionnaireId: number) {
    return this.httpClient.get<Question[]>(
      this.questionUrl + `q/` + `${questionnaireId}`
    );
  }

  // tslint:disable-next-line:typedef
  addQuestion(question: Question) {
    return this.httpClient.post<Question>(this.questionUrl + `add`, question);
  }

  // tslint:disable-next-line:typedef
  updateQuestion(questionId: number, question: Question) {
    console.log(question);
    return this.httpClient.put<Question>(
      this.questionUrl + `${questionId}`,
      question
    );
  }

  // tslint:disable-next-line:typedef
  addTemplateQuestion(question: any) {
    return this.httpClient.post<Question>(
      this.questionUrl + `add-template`,
      question
    );
  }
}
