/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ApiReniecService } from './api-reniec.service';

describe('Service: ApiReniec', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiReniecService]
    });
  });

  it('should ...', inject([ApiReniecService], (service: ApiReniecService) => {
    expect(service).toBeTruthy();
  }));
});
