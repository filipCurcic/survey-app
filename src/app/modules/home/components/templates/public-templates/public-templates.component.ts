import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/auth/authorization/auth.service';
import { QuestionnaireService } from 'src/app/core/services/questionnaire/questionnaire.service';
import { Questionnaire } from 'src/app/shared/models/questionnaire';

@Component({
  selector: 'app-public-templates',
  templateUrl: './public-templates.component.html',
  styleUrls: ['./public-templates.component.scss'],
})
export class PublicTemplatesComponent implements OnInit {
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
      .getPublicTemplates()
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
