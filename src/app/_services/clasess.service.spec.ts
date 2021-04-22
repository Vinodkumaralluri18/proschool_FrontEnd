import { TestBed } from '@angular/core/testing';

import { ClasessService } from './clasess.service';

describe('ClasessService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClasessService = TestBed.get(ClasessService);
    expect(service).toBeTruthy();
  });
});
