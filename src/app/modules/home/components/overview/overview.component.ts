import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  constructor() {}
  questionnaires = [
    {
      id: 1,
      name: 'Prvi upitnik',
      created: null,
      user: null,
      questions: [],
    },
    {
      id: 2,
      name: 'Drugi upitnik',
      created: null,
      user: null,
      questions: [],
    },
    {
      id: 3,
      name: 'Treci upitnik',
      created: null,
      user: null,
      questions: [],
    },
    {
      id: 4,
      name: 'Cetvrti upitnik',
      created: null,
      user: null,
      questions: [],
    },
  ];
  ngOnInit(): void {}
}
