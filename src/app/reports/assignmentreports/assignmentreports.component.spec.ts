import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentreportsComponent } from './assignmentreports.component';

describe('AssignmentreportsComponent', () => {
  let component: AssignmentreportsComponent;
  let fixture: ComponentFixture<AssignmentreportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmentreportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
