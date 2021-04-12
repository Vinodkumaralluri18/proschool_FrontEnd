import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPapersComponent } from './add-papers.component';

describe('AddPapersComponent', () => {
  let component: AddPapersComponent;
  let fixture: ComponentFixture<AddPapersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPapersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPapersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
