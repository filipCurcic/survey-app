import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { QuestionnaireService } from 'src/app/core/services/questionnaire/questionnaire.service';
import { Questionnaire } from '../../models/questionnaire';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  constructor(private questionnaireService: QuestionnaireService) {}

  @Input() message: string;

  @Input() questionnaire: Questionnaire;

  @Output() closeAlert = new EventEmitter<void>();

  @Output() deletetion = new EventEmitter<boolean>();

  ngOnInit(): void {}

  onClose(): void {
    this.closeAlert.emit();
  }

  onDelete(): void {
    this.questionnaireService
      .deleteQuestionnaire(this.questionnaire.id)
      .subscribe(() => location.reload());
  }
}
