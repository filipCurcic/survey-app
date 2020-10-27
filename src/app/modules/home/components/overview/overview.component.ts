import { Component, OnInit } from '@angular/core';
import { QuestionnaireService } from './../../../../core/services/questionnaire/questionnaire.service';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/core/auth/authorization/auth.service';
import { Questionnaire } from 'src/app/shared/models/questionnaire';

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
  sortingOption = '';

  backUpQuestionnaires = [];

  error = 'Are you sure you want to delete this questionnaire?';
  deletingQuetionnaire: Questionnaire;

  ngOnInit(): void {
    this.loadQuestionnaires();
  }

  loadQuestionnaires(): void {
    this.questionnaireService
      .getQuestionnaires(this.authService.getCurrentUser().id)
      .subscribe(
        (data) => (
          (this.questionnaires = data), (this.backUpQuestionnaires = data)
        )
      );
  }

  updatedQuestionnaires(boolValue: boolean): void {
    if (boolValue) {
      this.loadQuestionnaires();
      this.toastr.success('Action completed!', 'Success');
    }
  }

  deletePopUp(questionnaire: any): void {
    this.deleting = true;
    this.deletingQuetionnaire = questionnaire;
  }

  searchFilter() {
    this.questionnaires = this.backUpQuestionnaires;
    this.questionnaires = this.questionnaires.filter((q) =>
      q.name.replace(/\s/g, '').toLowerCase().includes(this.searchText)
    );
    if (this.questionnaires.length === 0) {
      this.questionnaires = this.backUpQuestionnaires;
    }
    if ((this.searchText = '')) {
      this.questionnaires = this.backUpQuestionnaires;
    }
  }

  dynamicSort(property: string) {
    var sortOrder = 1;
    if (property[0] === '-') {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      var result =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result * sortOrder;
    };
  }

  changeSortingOption(par: string) {
    this.questionnaires.sort(this.dynamicSort(par));
  }

  onClose(): void {
    this.deleting = false;
  }
}
