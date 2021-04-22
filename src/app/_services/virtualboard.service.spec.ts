import { TestBed } from '@angular/core/testing';

import { VirtualboardService } from './virtualboard.service';

describe('VirtualboardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VirtualboardService = TestBed.get(VirtualboardService);
    expect(service).toBeTruthy();
  });
});
