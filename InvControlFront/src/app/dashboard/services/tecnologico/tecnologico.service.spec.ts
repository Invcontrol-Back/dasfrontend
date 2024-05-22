import { TestBed } from '@angular/core/testing';

import { TecnologicoService } from './tecnologico.service';

describe('TecnologicoService', () => {
  let service: TecnologicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TecnologicoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
