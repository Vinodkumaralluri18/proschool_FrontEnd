import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CumulativeMarksComponent } from './cumulative-marks.component';

describe('CumulativeMarksComponent', () => {
  let component: CumulativeMarksComponent;
  let fixture: ComponentFixture<CumulativeMarksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CumulativeMarksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CumulativeMarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
