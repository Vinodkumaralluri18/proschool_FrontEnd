import { TestBed } from '@angular/core/testing';

import { AcademicsService } from './academics.service';

describe('AcademicsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AcademicsService = TestBed.get(AcademicsService);
    expect(service).toBeTruthy();
  });
});
