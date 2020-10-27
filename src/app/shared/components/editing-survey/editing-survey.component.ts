import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
} from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditingSurveyComponent implements OnInit, OnChanges {
  @Input() question: Question;
  @Input() answers: Answer[];
  newAnswer: string;
  allAnswers: Answer[];

  @Output()
  closedEditing: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() change: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
  }

  constructor(
    private answerService: AnswerService,
    private questionService: QuestionService,
    private toastr: ToastrService,
    private authService: AuthenticationService
  ) {}
  selectedAnswer: number;
  ngOnInit(): void {
    this.getAllAnswers();
    this.alterAnswers(this.question);
    console.log(this.allAnswers);
  }

  addAnswer(answerName: string): void {
    if (answerName == '') {
      this.toastr.warning('The field can not be empty');
    } else {
      this.beforeAddAnswer(this.question);
      const sampleAnswer = new Answer(null, answerName, this.question, null);

      this.answerService.addAnswer(sampleAnswer).subscribe({
        complete: () => {
          this.onChange(),
            this.alterAnswers(this.question),
            this.toastr.success('Action completed succesfully'),
            location.reload();
        },
      });
    }
  }

  onChange(): void {
    this.change.next(true);
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
    this.answerService
      .getAnswersByQuestionnaire(this.question.questionnaire.id)
      .subscribe(
        (data) =>
          (this.allAnswers = data.filter(
            (a) => a.question.id != this.question.id
          ))
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
      complete: () => (this.onChange(), location.reload()),
    });
  }

  deleteQuestion() {
    this.questionService.deleteQuestion(this.question.id).subscribe({
      complete: () => (
        this.onChange(),
        this.toastr.success('Action completed succesfully'),
        location.reload()
      ),
    });
  }

  onEditAnswer(answerEl: Answer) {
    if (answerEl['editing']) {
      answerEl['editing'] = false;
    } else {
      answerEl['editing'] = true;
    }
  }

  onCancelEdit(answer: Answer) {
    if (answer['editing']) {
      answer['editing'] = false;
    }
  }

  updateAnswer(name: string, answer: Answer) {
    let updatedAnswer = new Answer(answer.id, name, answer.question, '');
    if (name === '') {
      this.toastr.warning('The field can not be empty');
    } else {
      this.answerService.updateAnswer(answer.id, updatedAnswer).subscribe({
        complete: () => location.reload(),
      });
    }
  }

  onSaveQuestionName(newName: string) {
    if (newName === '') {
      this.toastr.warning('The field can not be empty');
    } else {
      this.beforeAddAnswer(this.question);
      const updatedQuestion: Question = {
        id: this.question.id,
        name: newName,
        questionnaire: this.question.questionnaire,
        answer: this.question.answer,
        requiredAnswerId: this.question.requiredAnswerId,
      };
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
          complete: () => (
            this.toastr.success('Action completed succesfully'),
            location.reload()
          ),
        });
    }
  }
}
