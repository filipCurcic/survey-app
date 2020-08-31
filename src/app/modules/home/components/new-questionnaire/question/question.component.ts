import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Answer } from 'src/app/shared/models/answer';
import { Observable } from 'rxjs';
import * as AnswerActions from './../../../../../core/services/answer/store/answer.actions';
import { Question } from 'src/app/shared/models/question';
import { AnswerService } from './../../../../../core/services/answer/answer.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  // answers: Observable<{ answers: Answer[] }>;
  // test = [];

  @Input() question: Question;

  @Input() answers: Answer[];

  @Output()
  answerAdded: EventEmitter<boolean> = new EventEmitter<boolean>();

  // constructor(private store: Store<{ answer: { answers: Answer[] } }>) {}

  constructor(private answerService: AnswerService) {}

  ngOnInit(): void {
    // this.answers = this.store.select('answer');
  }

  addAnswer(): void {
    // const newAnswer = { id: 1, name: 'pitanje', question: null };
    // this.store.dispatch(new AnswerActions.AddAnswer(newAnswer));
    const sampleAnswer = new Answer(null, 'test odgovor', this.question);
    this.answerService.addAnswer(sampleAnswer).subscribe({
      complete: () => {
        this.onChange();
      },
    });
  }

  onChange(): void {
    this.answerAdded.emit(true);
  }

  test(): void {
    console.log(this.answers);
  }
}
