import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdittopicComponent } from './edittopic.component';

describe('EdittopicComponent', () => {
  let component: EdittopicComponent;
  let fixture: ComponentFixture<EdittopicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdittopicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdittopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
