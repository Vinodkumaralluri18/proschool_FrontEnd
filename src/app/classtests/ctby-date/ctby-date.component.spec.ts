import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CTbyDateComponent } from './ctby-date.component';

describe('CTbyDateComponent', () => {
  let component: CTbyDateComponent;
  let fixture: ComponentFixture<CTbyDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CTbyDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CTbyDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
