import { TestBed } from '@angular/core/testing';

import { TiposvuelosService } from './tiposvuelos.service';

describe('TiposvuelosService', () => {
  let service: TiposvuelosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiposvuelosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
