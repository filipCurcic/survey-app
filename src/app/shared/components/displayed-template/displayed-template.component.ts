import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Questionnaire } from '../../models/questionnaire';
import { QuestionnaireService } from 'src/app/core/services/questionnaire/questionnaire.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/auth/authorization/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-displayed-template',
  templateUrl: './displayed-template.component.html',
  styleUrls: ['./displayed-template.component.scss'],
})
export class DisplayedTemplateComponent implements OnInit {
  constructor(
    private questionnaireService: QuestionnaireService,
    public router: Router,
    private authService: AuthenticationService,
    private toastr: ToastrService
  ) {}
  @Input() template: Questionnaire;

  @Output()
  templateDeleted: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnInit(): void {}

  deleteTemplate(id: number): void {
    this.questionnaireService.deleteQuestionnaire(id).subscribe({
      complete: () => {
        this.onChange(), this.toastr.show('Successfull deleted');
      },
    });
  }

  addQuestionnaireFromTemplate(templateQ: Questionnaire): void {
    templateQ.user = {
      id: this.authService.getCurrentUser().id,
      email: this.authService.getCurrentUser().email,
      password: this.authService.getCurrentUser().password,
      permission: {
        id: 1,
        authority: 'ROLE_USER',
      },
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

  makeTemplatePublic() {
    this.template.user = {
      id: this.authService.getCurrentUser().id,
      email: this.authService.getCurrentUser().email,
      password: this.authService.getCurrentUser().password,
      permission: {
        id: 1,
        authority: 'ROLE_USER',
      },
    };
    this.template.publicTemplate = true;
    this.questionnaireService
      .updateQuestionnaire(this.template, this.template.id)
      .subscribe({
        complete: () => (
          this.onChange(), this.toastr.show('Successfully made public')
        ),
      });
  }

  makeTemplatePrivate() {
    this.template.user = {
      id: this.authService.getCurrentUser().id,
      email: this.authService.getCurrentUser().email,
      password: this.authService.getCurrentUser().password,
      permission: {
        id: 1,
        authority: 'ROLE_USER',
      },
    };
    this.template.publicTemplate = false;
    this.questionnaireService
      .updateQuestionnaire(this.template, this.template.id)
      .subscribe({
        complete: () => (
          this.onChange(), this.toastr.show('Successfully made private')
        ),
      });
  }

  getUserId(): number {
    return this.authService.getCurrentUser().id;
  }

  test() {
    console.log(this.template);
  }

  onChange(): void {
    this.templateDeleted.emit(true);
  }

  changeRoute(): void {
    this.router.navigate(['/overview']);
  }
}
