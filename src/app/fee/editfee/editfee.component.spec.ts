import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditfeeComponent } from './editfee.component';

describe('EditfeeComponent', () => {
  let component: EditfeeComponent;
  let fixture: ComponentFixture<EditfeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditfeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditfeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
