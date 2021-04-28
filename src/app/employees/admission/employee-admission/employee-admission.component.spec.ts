import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAdmissionComponent } from './employee-admission.component';

describe('EmployeeAdmissionComponent', () => {
  let component: EmployeeAdmissionComponent;
  let fixture: ComponentFixture<EmployeeAdmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeAdmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAdmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
