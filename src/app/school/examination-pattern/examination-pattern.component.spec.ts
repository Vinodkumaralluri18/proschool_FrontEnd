import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExaminationPatternComponent } from './examination-pattern.component';

describe('ExaminationPatternComponent', () => {
  let component: ExaminationPatternComponent;
  let fixture: ComponentFixture<ExaminationPatternComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExaminationPatternComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExaminationPatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
