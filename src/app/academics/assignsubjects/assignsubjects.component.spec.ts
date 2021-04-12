import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignsubjectsComponent } from './assignsubjects.component';

describe('AssignsubjectsComponent', () => {
  let component: AssignsubjectsComponent;
  let fixture: ComponentFixture<AssignsubjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignsubjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignsubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
