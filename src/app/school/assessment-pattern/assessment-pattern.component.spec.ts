import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentPatternComponent } from './assessment-pattern.component';

describe('AssessmentPatternComponent', () => {
  let component: AssessmentPatternComponent;
  let fixture: ComponentFixture<AssessmentPatternComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessmentPatternComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentPatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
