import { TestBed } from '@angular/core/testing';

import { TipoUbicacionService } from './tipo-ubicacion.service';

describe('TipoUbicacionService', () => {
  let service: TipoUbicacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoUbicacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
