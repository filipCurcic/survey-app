import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Answer } from 'src/app/shared/models/answer';
import { Question } from 'src/app/shared/models/question';
import { Observable } from 'rxjs';
import * as AnswerActions from './../../../../core/services/answer/store/answer.actions';

@Component({
  selector: 'app-new-questionnaire',
  templateUrl: './new-questionnaire.component.html',
  styleUrls: ['./new-questionnaire.component.scss'],
})
export class NewQuestionnaireComponent implements OnInit {
  questions: Observable<{ questions: Question[] }>;

  constructor(private store: Store<{ question: { questions: Question[] } }>) {}

  newAnswer: Answer;

  ngOnInit(): void {
    this.questions = this.store.select('question');
  }

  addAnswer(): void {
    this.newAnswer = { id: 20, name: 'test pitanje', question: null };
    this.store.dispatch(new AnswerActions.AddAnswer(this.newAnswer));
  }
}
