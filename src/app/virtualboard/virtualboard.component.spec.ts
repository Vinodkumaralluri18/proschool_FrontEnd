import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualboardComponent } from './virtualboard.component';

describe('VirtualboardComponent', () => {
  let component: VirtualboardComponent;
  let fixture: ComponentFixture<VirtualboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtualboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
