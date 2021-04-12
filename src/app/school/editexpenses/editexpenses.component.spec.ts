import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditexpensesComponent } from './editexpenses.component';

describe('EditexpensesComponent', () => {
  let component: EditexpensesComponent;
  let fixture: ComponentFixture<EditexpensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditexpensesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditexpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
