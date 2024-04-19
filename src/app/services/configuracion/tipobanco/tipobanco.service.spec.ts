/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TipobancoService } from './tipobanco.service';

describe('Service: Tipobanco', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TipobancoService]
    });
  });

  it('should ...', inject([TipobancoService], (service: TipobancoService) => {
    expect(service).toBeTruthy();
  }));
});
