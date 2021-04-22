import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PwbydateComponent } from './pwbydate.component';

describe('PwbydateComponent', () => {
  let component: PwbydateComponent;
  let fixture: ComponentFixture<PwbydateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PwbydateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PwbydateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
