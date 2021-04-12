import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarksListComponent } from './marks-list.component';

describe('MarksListComponent', () => {
  let component: MarksListComponent;
  let fixture: ComponentFixture<MarksListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarksListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
