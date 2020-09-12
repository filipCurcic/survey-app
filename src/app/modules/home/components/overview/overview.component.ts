import { Component, OnInit } from '@angular/core';
import { QuestionnaireService } from './../../../../core/services/questionnaire/questionnaire.service';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/core/auth/authorization/auth.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  constructor(
    private questionnaireService: QuestionnaireService,
    private toastr: ToastrService,
    private authService: AuthenticationService
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
      .getQuestionnaires(this.authService.getCurrentUser().id)
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
