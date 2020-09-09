import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question } from '../../models/question';
import { AnswerService } from 'src/app/core/services/answer/answer.service';
import { QuestionService } from 'src/app/core/services/question/question.service';
import { Answer } from '../../models/answer';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-editing-survey',
  templateUrl: './editing-survey.component.html',
  styleUrls: ['./editing-survey.component.scss'],
})
export class EditingSurveyComponent implements OnInit {
  @Input() question: Question;
  @Input() answers: Answer[];
  newAnswer: string;
  allAnswers: Answer[];

  @Output()
  answerAdded: EventEmitter<Question> = new EventEmitter<Question>();

  @Output()
  closedEditing: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private answerService: AnswerService,
    private questionService: QuestionService,
    private toastr: ToastrService
  ) {}
  selectedAnswer: number;
  ngOnInit(): void {
    this.alterAnswers(this.question);
    this.getAllAnswers();
    console.log(this.allAnswers);
  }

  addAnswer(answerName: string): void {
    // const newAnswer = { id: 1, name: 'pitanje', question: null };
    // this.store.dispatch(new AnswerActions.AddAnswer(newAnswer));
    const sampleAnswer = new Answer(null, answerName, this.question, null);
    this.answerService.addAnswer(sampleAnswer).subscribe({
      complete: () => {
        this.onChange();
      },
    });
  }

  onChange(): void {
    this.answerAdded.emit(this.question);
  }

  alterAnswers(question: Question) {
    for (let a of question.answer) {
      a['editing'] = false;
    }
  }

  test(): void {
    console.log(this.allAnswers);
  }

  selectAnswer(answer: number) {
    console.log(answer);
  }

  getAllAnswers() {
    let answerIds = [];
    if (this.question.answer.length > 0) {
      for (let a of this.question.answer) {
        answerIds.push(a.id);
      }
    }
    this.answerService
      .getAnswers()
      .subscribe(
        (data) =>
          (this.allAnswers = data.filter((q) => !answerIds.includes(q.id)))
      );
  }

  addRequiredAnswer() {
    console.log(this.question);
    this.question.requiredAnswerId = this.selectedAnswer;
    this.questionService
      .updateQuestion(this.question.id, this.question)
      .subscribe({
        complete: () => (
          this.onChange(), this.toastr.success('Action completed!', 'Success')
        ),
      });
  }

  closeEditing() {
    this.closedEditing.emit(true);
  }

  deleteAnswer(answer: Answer) {
    this.answerService.deleteAnswer(answer.id).subscribe({
      complete: () => this.onChange(),
    });
  }

  deleteQuestion() {
    this.questionService.deleteQuestion(this.question.id).subscribe({
      complete: () => this.onChange(),
    });
  }

  onEditAnswer(answerEl: Answer) {
    console.log('asd');
    if (answerEl['editing']) {
      answerEl['editing'] = false;
    } else {
      answerEl['editing'] = true;
    }
  }

  updateAnswer(name: string, answer: Answer) {
    let updatedAnswer = new Answer(answer.id, name, answer.question, '');
    this.answerService.updateAnswer(answer.id, updatedAnswer).subscribe({
      complete: () => this.onChange(),
    });
  }

  saveChanges() {}
}
