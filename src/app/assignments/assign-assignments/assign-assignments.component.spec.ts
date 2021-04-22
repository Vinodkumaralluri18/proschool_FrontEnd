import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignAssignmentsComponent } from './assign-assignments.component';

describe('AssignAssignmentsComponent', () => {
  let component: AssignAssignmentsComponent;
  let fixture: ComponentFixture<AssignAssignmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignAssignmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignAssignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
