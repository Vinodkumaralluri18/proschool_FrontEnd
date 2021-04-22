import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeReportsbyMonthComponent } from './fee-reportsby-month.component';

describe('FeeReportsbyMonthComponent', () => {
  let component: FeeReportsbyMonthComponent;
  let fixture: ComponentFixture<FeeReportsbyMonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeeReportsbyMonthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeeReportsbyMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
