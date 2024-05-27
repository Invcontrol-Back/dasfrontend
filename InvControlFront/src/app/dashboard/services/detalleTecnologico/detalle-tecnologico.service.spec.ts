import { TestBed } from '@angular/core/testing';

import { DetalleTecnologicoService } from './detalle-tecnologico.service';

describe('DetalleTecnologicoService', () => {
  let service: DetalleTecnologicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetalleTecnologicoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
