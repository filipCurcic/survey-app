import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicTemplatesComponent } from './public-templates.component';

describe('PublicTemplatesComponent', () => {
  let component: PublicTemplatesComponent;
  let fixture: ComponentFixture<PublicTemplatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicTemplatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
