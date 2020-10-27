import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Answer } from 'src/app/shared/models/answer';
import { Observable } from 'rxjs';
import * as AnswerActions from './../../../../../core/services/answer/store/answer.actions';
import { Question } from 'src/app/shared/models/question';
import { AnswerService } from './../../../../../core/services/answer/answer.service';
import { QuestionService } from 'src/app/core/services/question/question.service';

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

  selectedAnswer: number;

  updatedQuestion: Question = {
    id: null,
    name: null,
    answer: null,
    questionnaire: null,
    requiredAnswerId: null,
    // requiredAnswer: new Answer(0, '', {
    //   id: 0,
    //   name: '',
    //   questionnaire: null,
    //   answer: [],
    //   requiredAnswer: null,
    // }),
  };

  // constructor(private store: Store<{ answer: { answers: Answer[] } }>) {}

  constructor(
    private answerService: AnswerService,
    private questionService: QuestionService
  ) {}

  ngOnInit(): void {
    // this.answers = this.store.select('answer');
  }

  addAnswer(): void {
    // const newAnswer = { id: 1, name: 'pitanje', question: null };
    // this.store.dispatch(new AnswerActions.AddAnswer(newAnswer));
    const sampleAnswer = new Answer(null, 'test odgovor', this.question, null);
    delete sampleAnswer.question['editing'];
    console.log(sampleAnswer);
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

  selectAnswer(answer: number) {
    console.log(answer);
  }

  addRequiredAnswer() {
    console.log(this.question);
    this.question.requiredAnswerId = this.selectedAnswer;
    this.questionService
      .updateQuestion(this.question.id, this.question)
      .subscribe({
        complete: () => this.onChange(),
      });
  }

  collapseContent(q) {
    if (!q.collapsed) {
      q.collapsed = true;
    } else if (q.collapsed) {
      q.collapsed = false;
    } else {
      q.collapsed = null;
    }
  }

  rotateIcon(q) {
    const classes = {
      rotated: q.collapsed,
      rotatedback: !q.collapsed,
    };
    return classes;
  }
}
