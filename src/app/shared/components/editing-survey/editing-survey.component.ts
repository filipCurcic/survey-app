import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question } from '../../models/question';
import { AnswerService } from 'src/app/core/services/answer/answer.service';
import { QuestionService } from 'src/app/core/services/question/question.service';
import { Answer } from '../../models/answer';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/core/auth/authorization/auth.service';
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
    private toastr: ToastrService,
    private authService: AuthenticationService
  ) {}
  selectedAnswer: number;
  ngOnInit(): void {
    this.alterAnswers(this.question);
    this.getAllAnswers();
  }

  addAnswer(answerName: string): void {
    this.beforeAddAnswer(this.question);
    // const newAnswer = { id: 1, name: 'pitanje', question: null };
    // this.store.dispatch(new AnswerActions.AddAnswer(newAnswer));
    const sampleAnswer = new Answer(null, answerName, this.question, null);

    this.answerService.addAnswer(sampleAnswer).subscribe({
      complete: () => {
        this.onChange(), this.alterAnswers(this.question);
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

  beforeAddAnswer(question: Question) {
    delete this.question['editing'];
    for (let a of question.answer) {
      delete a['editing'];
    }
  }

  test(): void {
    console.log(this.allAnswers);
  }

  selectAnswer(answer: number) {
    console.log(answer);
  }

  getAllAnswers() {
    // let answerIds = [];
    // if (this.question.answer.length > 0) {
    //   for (let a of this.question.answer) {
    //     answerIds.push(a.id);
    //   }
    // }
    this.answerService
      .getAnswersByUser(this.authService.getCurrentUser().id)
      .subscribe(
        (data) => (this.allAnswers = data)
        // (this.allAnswers = data.filter((q) => !answerIds.includes(q.id)))
      );
  }

  addRequiredAnswer() {
    console.log(this.question.questionnaire);
    this.beforeAddAnswer(this.question);
    this.question.requiredAnswerId = this.selectedAnswer;
    this.question.questionnaire.user = {
      id: this.authService.getCurrentUser().id,
      password: this.authService.getCurrentUser().password,
      email: this.authService.getCurrentUser().email,
      permission: {
        id: 1,
        authority: 'ROLE_USER',
      },
    };
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

  onSaveQuestionName(newName: string) {
    console.log(this.question.questionnaire);
    this.beforeAddAnswer(this.question);
    const updatedQuestion: Question = {
      id: this.question.id,
      name: newName,
      questionnaire: this.question.questionnaire,
      answer: this.question.answer,
      requiredAnswerId: this.question.requiredAnswerId,
    };
    updatedQuestion.questionnaire.created = this.question.questionnaire.created;
    updatedQuestion.questionnaire.user = {
      id: this.authService.getCurrentUser().id,
      email: this.authService.getCurrentUser().email,
      password: this.authService.getCurrentUser().password,
      permission: {
        id: 1,
        authority: 'ROLE_USER',
      },
    };
    this.questionService
      .updateQuestion(this.question.id, updatedQuestion)
      .subscribe({
        complete: () => this.onChange(),
      });
  }
}
