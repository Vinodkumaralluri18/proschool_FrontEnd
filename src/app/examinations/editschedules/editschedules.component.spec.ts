import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditschedulesComponent } from './editschedules.component';

describe('EditschedulesComponent', () => {
  let component: EditschedulesComponent;
  let fixture: ComponentFixture<EditschedulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditschedulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditschedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
