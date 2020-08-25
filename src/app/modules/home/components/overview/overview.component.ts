import { Component, OnInit } from '@angular/core';
import { QuestionnaireService } from './../../../../core/services/questionnaire/questionnaire.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  constructor(
    private questionnaireService: QuestionnaireService,
    private toastr: ToastrService
  ) {}
  questionnaires = [];
  deleting = false;
  searchText = '';

  error = 'asasd';
  ngOnInit(): void {
    this.loadQuestionnaires();
  }

  loadQuestionnaires(): void {
    this.questionnaireService
      .getQuestionnaires()
      .subscribe((data) => (this.questionnaires = data));
  }

  updatedQuestionnaires(boolValue: boolean): void {
    if (boolValue) {
      this.loadQuestionnaires();
      this.toastr.success('Action completed!', 'Success');
      this.deleting = true;
    }
  }

  onClose(): void {
    this.deleting = false;
  }
}
