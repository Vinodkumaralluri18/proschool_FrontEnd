import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeReportsbyDayComponent } from './fee-reportsby-day.component';

describe('FeeReportsbyDayComponent', () => {
  let component: FeeReportsbyDayComponent;
  let fixture: ComponentFixture<FeeReportsbyDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeeReportsbyDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeeReportsbyDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
