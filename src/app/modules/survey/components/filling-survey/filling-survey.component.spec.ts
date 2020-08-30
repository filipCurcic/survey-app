import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FillingSurveyComponent } from './filling-survey.component';

describe('FillingSurveyComponent', () => {
  let component: FillingSurveyComponent;
  let fixture: ComponentFixture<FillingSurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FillingSurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillingSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
