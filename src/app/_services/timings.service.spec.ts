import { TestBed } from '@angular/core/testing';

import { TimingsService } from './timings.service';

describe('TimingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TimingsService = TestBed.get(TimingsService);
    expect(service).toBeTruthy();
  });
});
