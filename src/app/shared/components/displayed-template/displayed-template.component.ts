import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Questionnaire } from '../../models/questionnaire';
import { QuestionnaireService } from 'src/app/core/services/questionnaire/questionnaire.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-displayed-template',
  templateUrl: './displayed-template.component.html',
  styleUrls: ['./displayed-template.component.scss'],
})
export class DisplayedTemplateComponent implements OnInit {
  constructor(
    private questionnaireService: QuestionnaireService,
    private router: Router
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

  addQuestionnaireFromTemplate(template: Questionnaire): void {
    this.questionnaireService.addQuestionnaireFromTemplate(template).subscribe({
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
