/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PaqueteReservaService } from './paquete-reserva.service';

describe('Service: PaqueteReserva', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaqueteReservaService]
    });
  });

  it('should ...', inject([PaqueteReservaService], (service: PaqueteReservaService) => {
    expect(service).toBeTruthy();
  }));
});
