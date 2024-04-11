import { TestBed } from '@angular/core/testing';

import { CanalventaService } from './canalventa.service';

describe('CanalventaService', () => {
  let service: CanalventaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanalventaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
