import { TestBed } from '@angular/core/testing';

import { ParentinfoService } from './parentinfo.service';

describe('ParentinfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ParentinfoService = TestBed.get(ParentinfoService);
    expect(service).toBeTruthy();
  });
});
