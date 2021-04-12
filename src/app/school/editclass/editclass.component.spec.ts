import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditclassComponent } from './editclass.component';

describe('EditclassComponent', () => {
  let component: EditclassComponent;
  let fixture: ComponentFixture<EditclassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditclassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditclassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
