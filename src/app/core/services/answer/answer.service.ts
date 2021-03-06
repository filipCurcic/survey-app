import { Injectable } from '@angular/core';
import { Answer } from 'src/app/shared/models/answer';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AnswerService {
  answerUrl = 'http://localhost:8080/answer/';

  constructor(private httpClient: HttpClient) {}

  getAnswers() {
    return this.httpClient.get<Answer[]>(this.answerUrl + `all`);
  }

  // tslint:disable-next-line:typedef
  deleteAnswer(id: number) {
    return this.httpClient.delete<number>(this.answerUrl + `${id}`);
  }
  // tslint:disable-next-line:typedef
  addAnswer(answer: Answer) {
    return this.httpClient.post<Answer>(this.answerUrl + `add`, answer);
  }

  // tslint:disable-next-line:typedef
  updateAnswer(id: number, answer: Answer) {
    return this.httpClient.put<Answer>(this.answerUrl + `${id}`, answer);
  }

  // tslint:disable-next-line:typedef
  getAnswersByQuestion(questionId: number) {
    return this.httpClient.get<Answer[]>(
      this.answerUrl + `question/${questionId}`
    );
  }

  getAnswersByQuestionnaire(questionId: number) {
    return this.httpClient.get<Answer[]>(
      this.answerUrl + `questionnaire/${questionId}`
    );
  }

  getAnswersByUser(userId: number) {
    return this.httpClient.get<Answer[]>(this.answerUrl + `user/${userId}`);
  }

  // tslint:disable-next-line:typedef
  addAnswerFromTemplate(answer: Answer) {
    return this.httpClient.post<Answer>(
      this.answerUrl + `add-template`,
      answer
    );
  }
}
