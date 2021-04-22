import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditsubjectsComponent } from './addeditsubjects.component';

describe('AddeditsubjectsComponent', () => {
  let component: AddeditsubjectsComponent;
  let fixture: ComponentFixture<AddeditsubjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddeditsubjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddeditsubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
