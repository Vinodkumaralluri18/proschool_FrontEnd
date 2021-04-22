import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMarksComponent } from './add-marks.component';

describe('AddMarksComponent', () => {
  let component: AddMarksComponent;
  let fixture: ComponentFixture<AddMarksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMarksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
