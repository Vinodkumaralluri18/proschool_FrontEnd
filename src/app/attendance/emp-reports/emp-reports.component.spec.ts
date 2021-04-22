import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpReportsComponent } from './emp-reports.component';

describe('EmpReportsComponent', () => {
  let component: EmpReportsComponent;
  let fixture: ComponentFixture<EmpReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
