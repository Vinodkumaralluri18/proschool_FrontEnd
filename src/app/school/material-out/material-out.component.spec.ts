import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialOutComponent } from './material-out.component';

describe('MaterialOutComponent', () => {
  let component: MaterialOutComponent;
  let fixture: ComponentFixture<MaterialOutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialOutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
