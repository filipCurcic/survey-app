import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateTemplatesComponent } from './private-templates.component';

describe('PrivateTemplatesComponent', () => {
  let component: PrivateTemplatesComponent;
  let fixture: ComponentFixture<PrivateTemplatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivateTemplatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
