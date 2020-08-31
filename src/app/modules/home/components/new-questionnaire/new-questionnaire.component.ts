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
    private route: ActivatedRoute
  ) {}

  loadedQuestionnaire: Questionnaire;

  newAnswer: Answer;

  allAnswers = [];

  ngOnInit(): void {
    // this.questions = this.store.select('question');
    this.loadQuestionnaire();
  }

  loadQuestionnaire(): void {
    this.questionnaireService
      .getQuestionnaire(+this.route.snapshot.paramMap.get('id'))
      .subscribe(
        (data) => ((this.loadedQuestionnaire = data), this.getAllAnswers())
      );
  }

  addAnswer(): void {
    const q: Question = {
      id: null,
      name: 'test',
      questionnaire: this.loadedQuestionnaire,
      answer: [],
    };
    // this.newAnswer = { id: 20, name: 'test pitanje', question: null };
    // this.store.dispatch(new AnswerActions.AddAnswer(this.newAnswer));
    this.questionService.addQuestion(q).subscribe({
      complete: () => {
        this.loadQuestionnaire();
      },
    });
  }

  answerAdded(boolValue: boolean): void {
    this.loadQuestionnaire();
  }

  getAllAnswers() {
    for (let q of this.loadedQuestionnaire.question) {
      for (let a of q.answer) {
        this.allAnswers.push(a);
      }
    }
    console.log(this.allAnswers);
  }
}
