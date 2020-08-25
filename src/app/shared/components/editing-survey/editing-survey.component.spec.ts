import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditingSurveyComponent } from './editing-survey.component';

describe('EditingSurveyComponent', () => {
  let component: EditingSurveyComponent;
  let fixture: ComponentFixture<EditingSurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditingSurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditingSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
