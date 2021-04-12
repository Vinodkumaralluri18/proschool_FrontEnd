import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassfeeReportsComponent } from './classfee-reports.component';

describe('ClassfeeReportsComponent', () => {
  let component: ClassfeeReportsComponent;
  let fixture: ComponentFixture<ClassfeeReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassfeeReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassfeeReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
