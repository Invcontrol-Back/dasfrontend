import { TestBed } from '@angular/core/testing';

import { SubcategoriaService } from './subcategoria.service';

describe('SubcategoriaService', () => {
  let service: SubcategoriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubcategoriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
