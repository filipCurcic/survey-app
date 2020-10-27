import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Questionnaire } from '../../models/questionnaire';
import { QuestionnaireService } from 'src/app/core/services/questionnaire/questionnaire.service';
import { AuthenticationService } from 'src/app/core/auth/authorization/auth.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Question } from '../../models/question';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-displayed-survey',
  templateUrl: './displayed-survey.component.html',
  styleUrls: ['./displayed-survey.component.scss'],
})
export class DisplayedSurveyComponent implements OnInit {
  @Input() questionnaire: Questionnaire;

  @Output()
  questionnaireDeleted: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  deleteRequest: EventEmitter<{}> = new EventEmitter<{}>();

  constructor(
    private questionnaireService: QuestionnaireService,
    private authService: AuthenticationService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {}

  deleteQuestionnaire(id: number): void {
    this.deleteRequest.emit(this.questionnaire);
  }

  copyQuestionnaire(questionnaire: Questionnaire): void {
    questionnaire.user = {
      id: this.authService.getCurrentUser().id,
      email: this.authService.getCurrentUser().email,
      password: this.authService.getCurrentUser().password,
      permission: {
        id: 1,
        authority: 'ROLE_USER',
      },
    };
    console.log(questionnaire);

    this.questionnaireService.copyQuestionnaire(questionnaire).subscribe({
      complete: () => {
        this.buttonClicked();
      },
    });
  }

  returnAnswers(question: Question) {
    const answers = [];
    for (const a of question.answer) {
      answers.push({ text: a.name, margin: [30, 10, 0, 0] });
    }
    return answers;
  }

  downloadPDF(questionnaire: Questionnaire) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    const docDefinition = {
      name: questionnaire.name,
      content: [],
    };
    let counter = 0;
    docDefinition.content.push({
      text: questionnaire.name,
      fontSize: 24,
      bold: true,
      margin: [130, 50, 0, 0],
    });
    for (const q of questionnaire.question) {
      counter += 1;
      docDefinition.content.push(
        {
          text: '\n\n' + counter + '.' + ' ' + q.name,
          fontSize: 18,
          bold: true,
          margin: [0, 20, 0, 0],
        },
        {
          type: 'square',
          ul: this.returnAnswers(q),
        }
      );
    }

    pdfMake.createPdf(docDefinition).download();
  }

  saveAsTemplate(questionnaire: Questionnaire): void {
    questionnaire.user = {
      id: this.authService.getCurrentUser().id,
      email: this.authService.getCurrentUser().email,
      password: this.authService.getCurrentUser().password,
      permission: {
        id: 1,
        authority: 'ROLE_USER',
      },
    };
    this.questionnaire.template = true;
    console.log(questionnaire);

    this.questionnaireService.saveAsTemplate(questionnaire).subscribe({
      complete: () => {
        this.buttonClicked(),
          this.toastrService.success('Successfully saved as Template');
      },
    });
  }

  buttonClicked(): void {
    this.questionnaireDeleted.emit(true);
  }
}
