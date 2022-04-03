import { TestBed } from '@angular/core/testing';

import { ApiModuleService } from './api-module.service';

describe('ApiModuleService', () => {
  let service: ApiModuleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiModuleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
