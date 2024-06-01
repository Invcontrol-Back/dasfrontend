import { TestBed } from '@angular/core/testing';

import { InmobiliarioService } from './inmobiliario.service';

describe('InmobiliarioService', () => {
  let service: InmobiliarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InmobiliarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
