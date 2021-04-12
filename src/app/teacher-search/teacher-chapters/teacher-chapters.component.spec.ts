import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherChaptersComponent } from './teacher-chapters.component';

describe('TeacherChaptersComponent', () => {
  let component: TeacherChaptersComponent;
  let fixture: ComponentFixture<TeacherChaptersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherChaptersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherChaptersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
