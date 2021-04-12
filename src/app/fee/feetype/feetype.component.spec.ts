import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeetypeComponent } from './feetype.component';

describe('FeetypeComponent', () => {
  let component: FeetypeComponent;
  let fixture: ComponentFixture<FeetypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeetypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeetypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
