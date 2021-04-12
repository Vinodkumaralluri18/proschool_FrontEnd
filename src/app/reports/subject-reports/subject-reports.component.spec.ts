import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectReportsComponent } from './subject-reports.component';

describe('SubjectReportsComponent', () => {
  let component: SubjectReportsComponent;
  let fixture: ComponentFixture<SubjectReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
