import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialInComponent } from './material-in.component';

describe('MaterialInComponent', () => {
  let component: MaterialInComponent;
  let fixture: ComponentFixture<MaterialInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
