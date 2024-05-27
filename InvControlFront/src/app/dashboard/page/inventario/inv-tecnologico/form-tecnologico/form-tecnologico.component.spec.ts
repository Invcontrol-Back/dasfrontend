import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTecnologicoComponent } from './form-tecnologico.component';

describe('FormTecnologicoComponent', () => {
  let component: FormTecnologicoComponent;
  let fixture: ComponentFixture<FormTecnologicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormTecnologicoComponent]
    });
    fixture = TestBed.createComponent(FormTecnologicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
