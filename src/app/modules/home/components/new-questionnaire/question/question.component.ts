import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Answer } from 'src/app/shared/models/answer';
import { Observable } from 'rxjs';
import * as AnswerActions from './../../../../../core/services/answer/store/answer.actions';
import { Question } from 'src/app/shared/models/question';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  // answers: Observable<{ answers: Answer[] }>;
  // test = [];

  @Input() question: Question;

  // constructor(private store: Store<{ answer: { answers: Answer[] } }>) {}

  ngOnInit(): void {
    // this.answers = this.store.select('answer');
  }

  addAnswer(): void {
    // const newAnswer = { id: 1, name: 'pitanje', question: null };
    // this.store.dispatch(new AnswerActions.AddAnswer(newAnswer));
  }
}
