import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditschoolprofileComponent } from './editschoolprofile.component';

describe('EditschoolprofileComponent', () => {
  let component: EditschoolprofileComponent;
  let fixture: ComponentFixture<EditschoolprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditschoolprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditschoolprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
