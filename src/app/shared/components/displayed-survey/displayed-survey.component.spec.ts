import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayedSurveyComponent } from './displayed-survey.component';

describe('DisplayedSurveyComponent', () => {
  let component: DisplayedSurveyComponent;
  let fixture: ComponentFixture<DisplayedSurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayedSurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayedSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
