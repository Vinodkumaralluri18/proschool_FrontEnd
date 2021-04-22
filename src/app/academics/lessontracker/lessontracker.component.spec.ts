import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessontrackerComponent } from './lessontracker.component';

describe('LessontrackerComponent', () => {
  let component: LessontrackerComponent;
  let fixture: ComponentFixture<LessontrackerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessontrackerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessontrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
