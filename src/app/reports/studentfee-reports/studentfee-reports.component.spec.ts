import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentfeeReportsComponent } from './studentfee-reports.component';

describe('StudentfeeReportsComponent', () => {
  let component: StudentfeeReportsComponent;
  let fixture: ComponentFixture<StudentfeeReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentfeeReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentfeeReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
