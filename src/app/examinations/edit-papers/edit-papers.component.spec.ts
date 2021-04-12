import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPapersComponent } from './edit-papers.component';

describe('EditPapersComponent', () => {
  let component: EditPapersComponent;
  let fixture: ComponentFixture<EditPapersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPapersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPapersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
