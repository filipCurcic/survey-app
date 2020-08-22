import { Component, OnInit, Input } from '@angular/core';
import { Questionnaire } from '../../models/questionnaire';
@Component({
  selector: 'app-displayed-survey',
  templateUrl: './displayed-survey.component.html',
  styleUrls: ['./displayed-survey.component.scss'],
})
export class DisplayedSurveyComponent implements OnInit {
  @Input() questionnaire: Questionnaire;

  constructor() {}

  ngOnInit(): void {}
}
