import { TestBed } from '@angular/core/testing';

import { TiposdocumentoService } from './tiposdocumento.service';

describe('TiposdocumentoService', () => {
  let service: TiposdocumentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiposdocumentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
