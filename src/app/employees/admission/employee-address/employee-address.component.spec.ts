import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAddressComponent } from './employee-address.component';

describe('EmployeeAddressComponent', () => {
  let component: EmployeeAddressComponent;
  let fixture: ComponentFixture<EmployeeAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
