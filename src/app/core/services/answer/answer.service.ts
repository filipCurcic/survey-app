import { Injectable } from '@angular/core';
import { Answer } from 'src/app/shared/models/answer';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AnswerService {
  answerUrl = 'http://localhost:8080/answer';

  constructor(private httpClient: HttpClient) {}

  // tslint:disable-next-line:typedef
  deleteAnswer(id: number) {
    return this.httpClient.delete<number>(this.answerUrl + `${id}`);
  }

  // tslint:disable-next-line:typedef
  updateAnswer(id: number, answer: Answer) {
    return this.httpClient.put<Answer>(this.answerUrl + `${id}`, answer);
  }

  // tslint:disable-next-line:typedef
  getAnswersByQuestion(questionId: number) {
    return this.httpClient.get<Answer>(this.answerUrl + `a/` + `${questionId}`);
  }

  // tslint:disable-next-line:typedef
  addAnswerFromTemplate(answer: Answer) {
    return this.httpClient.post<Answer>(
      this.answerUrl + `add-template`,
      answer
    );
  }
}
