import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenMessageComponent } from './open-message.component';

describe('OpenMessageComponent', () => {
  let component: OpenMessageComponent;
  let fixture: ComponentFixture<OpenMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
