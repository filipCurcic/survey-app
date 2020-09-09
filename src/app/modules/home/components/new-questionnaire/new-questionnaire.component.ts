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
    private toastr: ToastrService
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
          this.getAllAnswers(),
          this.alterQuestions(this.loadedQuestionnaire),
          console.log(this.loadedQuestionnaire.question)
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
    // this.newAnswer = { id: 20, name: 'test pitanje', question: null };
    // this.store.dispatch(new AnswerActions.AddAnswer(this.newAnswer));
    this.questionService.addQuestion(q).subscribe({
      complete: () => {
        this.loadQuestionnaire();
      },
    });
  }

  answerAdded(question: Question): void {
    this.loadQuestionnaire();
    this.onChangeEditing(question);
  }

  getAllAnswers() {
    for (let q of this.loadedQuestionnaire.question) {
      for (let a of q.answer) {
        this.allAnswers.push(a);
      }
    }
    console.log(this.allAnswers);
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
      this.loadedQuestionnaire.created,
      this.loadedQuestionnaire.user,
      [],
      false
    );
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
