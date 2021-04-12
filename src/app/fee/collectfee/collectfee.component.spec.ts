import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectfeeComponent } from './collectfee.component';

describe('CollectfeeComponent', () => {
  let component: CollectfeeComponent;
  let fixture: ComponentFixture<CollectfeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectfeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectfeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
