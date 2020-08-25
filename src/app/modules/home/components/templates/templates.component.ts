import { Component, OnInit } from '@angular/core';
import { QuestionnaireService } from 'src/app/core/services/questionnaire/questionnaire.service';
import { Questionnaire } from 'src/app/shared/models/questionnaire';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss'],
})
export class TemplatesComponent implements OnInit {
  constructor(private questionnaireService: QuestionnaireService) {}
  templates: Questionnaire[];
  ngOnInit(): void {
    this.loadTemplates();
  }

  loadTemplates(): void {
    this.questionnaireService
      .getTemplates()
      .subscribe((data) => (this.templates = data));
  }

  updatedTemplates(boolValue: boolean): void {
    if (boolValue) {
      this.loadTemplates();
    }
  }
}
