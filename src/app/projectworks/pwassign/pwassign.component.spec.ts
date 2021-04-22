import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PwassignComponent } from './pwassign.component';

describe('PwassignComponent', () => {
  let component: PwassignComponent;
  let fixture: ComponentFixture<PwassignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PwassignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PwassignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
