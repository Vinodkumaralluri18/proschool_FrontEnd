import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAssessmentsComponent } from './edit-assessments.component';

describe('EditAssessmentsComponent', () => {
  let component: EditAssessmentsComponent;
  let fixture: ComponentFixture<EditAssessmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAssessmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAssessmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
