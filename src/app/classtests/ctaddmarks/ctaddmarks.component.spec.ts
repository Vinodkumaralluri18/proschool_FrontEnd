import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CTaddmarksComponent } from './ctaddmarks.component';

describe('CTaddmarksComponent', () => {
  let component: CTaddmarksComponent;
  let fixture: ComponentFixture<CTaddmarksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CTaddmarksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CTaddmarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
