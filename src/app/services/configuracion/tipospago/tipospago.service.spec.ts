import { TestBed } from '@angular/core/testing';

import { TipospagoService } from './tipospago.service';

describe('TipospagoService', () => {
  let service: TipospagoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipospagoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
