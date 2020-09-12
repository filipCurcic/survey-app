import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Questionnaire } from '../../models/questionnaire';
import { QuestionnaireService } from 'src/app/core/services/questionnaire/questionnaire.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/auth/authorization/auth.service';

@Component({
  selector: 'app-displayed-template',
  templateUrl: './displayed-template.component.html',
  styleUrls: ['./displayed-template.component.scss'],
})
export class DisplayedTemplateComponent implements OnInit {
  constructor(
    private questionnaireService: QuestionnaireService,
    private router: Router,
    private authService: AuthenticationService
  ) {}
  @Input() template: Questionnaire;

  @Output()
  templateDeleted: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnInit(): void {}

  deleteTemplate(id: number): void {
    this.questionnaireService.deleteQuestionnaire(id).subscribe({
      complete: () => {
        this.onChange();
      },
    });
  }

  addQuestionnaireFromTemplate(templateQ: Questionnaire): void {
    templateQ.user = {
      id: this.authService.getCurrentUser().id,
      firstName: '',
      lastName: '',
      email: this.authService.getCurrentUser().email,
      password: '',
      permission: null,
      userName: '',
    };
    console.log(templateQ.user);
    this.questionnaireService
      .addQuestionnaireFromTemplate(templateQ)
      .subscribe({
        complete: () => {
          this.onChange();
          this.changeRoute();
        },
      });
  }

  onChange(): void {
    this.templateDeleted.emit(true);
  }

  changeRoute(): void {
    this.router.navigate(['/overview']);
  }
}
