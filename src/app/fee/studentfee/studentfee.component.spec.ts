import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentfeeComponent } from './studentfee.component';

describe('StudentfeeComponent', () => {
  let component: StudentfeeComponent;
  let fixture: ComponentFixture<StudentfeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentfeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentfeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
