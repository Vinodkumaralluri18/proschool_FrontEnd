import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CTAssignComponent } from './ctassign.component';

describe('CTAssignComponent', () => {
  let component: CTAssignComponent;
  let fixture: ComponentFixture<CTAssignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CTAssignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CTAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
