import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/auth/authorization/auth.service';
import { QuestionnaireService } from 'src/app/core/services/questionnaire/questionnaire.service';
import { Questionnaire } from 'src/app/shared/models/questionnaire';

@Component({
  selector: 'app-private-templates',
  templateUrl: './private-templates.component.html',
  styleUrls: ['./private-templates.component.scss'],
})
export class PrivateTemplatesComponent implements OnInit {
  constructor(
    private questionnaireService: QuestionnaireService,
    private authService: AuthenticationService
  ) {}
  templates: Questionnaire[];
  ngOnInit(): void {
    this.loadTemplates();
  }

  loadTemplates(): void {
    this.questionnaireService
      .getTemplates()
      .subscribe((data) => (this.templates = data));
  }

  getCurrentUserId(): number {
    return this.authService.getCurrentUser().id;
  }

  updatedTemplates(boolValue: boolean): void {
    if (boolValue) {
      this.loadTemplates();
    }
  }
}
