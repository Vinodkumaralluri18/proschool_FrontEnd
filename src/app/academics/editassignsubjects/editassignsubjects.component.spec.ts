import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditassignsubjectsComponent } from './editassignsubjects.component';

describe('EditassignsubjectsComponent', () => {
  let component: EditassignsubjectsComponent;
  let fixture: ComponentFixture<EditassignsubjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditassignsubjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditassignsubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
