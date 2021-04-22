import { TestBed } from '@angular/core/testing';

import { AssignsubjectsService } from './assignsubjects.service';

describe('AssignsubjectsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssignsubjectsService = TestBed.get(AssignsubjectsService);
    expect(service).toBeTruthy();
  });
});
