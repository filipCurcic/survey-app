import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/auth/authorization/auth.service';
import { QuestionnaireService } from 'src/app/core/services/questionnaire/questionnaire.service';
import { Questionnaire } from 'src/app/shared/models/questionnaire';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss'],
})
export class TemplatesComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}
}
