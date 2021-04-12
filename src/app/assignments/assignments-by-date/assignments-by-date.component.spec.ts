import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentsByDateComponent } from './assignments-by-date.component';

describe('AssignmentsByDateComponent', () => {
  let component: AssignmentsByDateComponent;
  let fixture: ComponentFixture<AssignmentsByDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmentsByDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentsByDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
