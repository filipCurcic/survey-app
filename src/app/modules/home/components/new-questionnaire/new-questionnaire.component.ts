import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Answer } from 'src/app/shared/models/answer';
import { Question } from 'src/app/shared/models/question';
import { Observable } from 'rxjs';
import * as AnswerActions from './../../../../core/services/answer/store/answer.actions';
import { QuestionnaireService } from 'src/app/core/services/questionnaire/questionnaire.service';
import { Questionnaire } from 'src/app/shared/models/questionnaire';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/core/services/question/question.service';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/core/auth/authorization/auth.service';

@Component({
  selector: 'app-new-questionnaire',
  templateUrl: './new-questionnaire.component.html',
  styleUrls: ['./new-questionnaire.component.scss'],
})
export class NewQuestionnaireComponent implements OnInit {
  // questions: Observable<{ questions: Question[] }>;

  // constructor(private store: Store<{ question: { questions: Question[] } }>) {}

  constructor(
    private questionnaireService: QuestionnaireService,
    private questionService: QuestionService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private authService: AuthenticationService
  ) {}

  loadedQuestionnaire: Questionnaire;

  newAnswer: Answer;

  questionnaireNameEdit: boolean;

  currentUser = {};

  allAnswers = [];

  ngOnInit(): void {
    // this.questions = this.store.select('question');
    this.loadQuestionnaire();
  }

  loadQuestionnaire(): void {
    this.questionnaireService
      .getQuestionnaire(+this.route.snapshot.paramMap.get('id'))
      .subscribe(
        (data) => (
          (this.loadedQuestionnaire = data),
          (this.loadedQuestionnaire.user = {
            id: this.authService.getCurrentUser().id,
            password: '',
            email: this.authService.getCurrentUser().email,
            permission: {
              id: 1,
              authority: 'ROLE_USER',
            },
          }),
          this.getAllAnswers(),
          this.alterQuestions(this.loadedQuestionnaire)
        )
      );
  }

  addQuestion(): void {
    const q: Question = {
      id: null,
      name: 'test',
      questionnaire: this.loadedQuestionnaire,
      answer: [],
      requiredAnswerId: null,
    };
    for (let question of q.questionnaire.question) {
      delete question['editing'];
    }
    // this.newAnswer = { id: 20, name: 'test pitanje', question: null };
    // this.store.dispatch(new AnswerActions.AddAnswer(this.newAnswer));
    this.beforeQuestionAdd();
    this.questionService.addQuestion(q).subscribe({
      complete: () => {
        this.loadQuestionnaire();
      },
    });
  }

  onUpdate(eventValue: boolean) {
    if (eventValue) {
      this.loadQuestionnaire();
    }
  }

  beforeQuestionAdd() {
    for (let q of this.loadedQuestionnaire.question) {
      delete q['editing'];
      for (let a of q.answer) {
        delete a['editing'];
      }
    }
  }

  getAllAnswers() {
    for (let q of this.loadedQuestionnaire.question) {
      for (let a of q.answer) {
        this.allAnswers.push(a);
      }
    }
  }

  alterQuestions(sampleQuestionnaire: Questionnaire) {
    for (let q of sampleQuestionnaire.question) {
      q['editing'] = false;
    }
  }

  onChangeEditing(question: Question) {
    if (question['editing']) {
      question['editing'] = false;
    } else {
      question['editing'] = true;
    }
  }

  onEdit() {
    if (this.questionnaireNameEdit) {
      this.questionnaireNameEdit = false;
    } else {
      this.questionnaireNameEdit = true;
    }
  }

  onSave(name: string) {
    let updatedQuestionnaire = new Questionnaire(
      this.loadedQuestionnaire.id,
      name,
      new Date(),
      this.loadedQuestionnaire.user,
      [],
      false,
      false
    );
    updatedQuestionnaire.user.password = this.authService.getCurrentUser().password;
    if (name === '') {
      this.toastr.warning('The field can not be  empty');
    } else {
      this.questionnaireService
        .updateQuestionnaire(updatedQuestionnaire, this.loadedQuestionnaire.id)
        .subscribe({
          complete: () => (
            this.loadQuestionnaire(),
            (this.questionnaireNameEdit = false),
            this.toastr.success('Action completed!', 'Success')
          ),
        });
    }
  }
}
