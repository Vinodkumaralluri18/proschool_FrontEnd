import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassFeeComponent } from './class-fee.component';

describe('ClassFeeComponent', () => {
  let component: ClassFeeComponent;
  let fixture: ComponentFixture<ClassFeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassFeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
