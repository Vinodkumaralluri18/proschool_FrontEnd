import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PwaddmarksComponent } from './pwaddmarks.component';

describe('PwaddmarksComponent', () => {
  let component: PwaddmarksComponent;
  let fixture: ComponentFixture<PwaddmarksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PwaddmarksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PwaddmarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
