import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayedTemplateComponent } from './displayed-template.component';

describe('DisplayedTemplateComponent', () => {
  let component: DisplayedTemplateComponent;
  let fixture: ComponentFixture<DisplayedTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayedTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayedTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
