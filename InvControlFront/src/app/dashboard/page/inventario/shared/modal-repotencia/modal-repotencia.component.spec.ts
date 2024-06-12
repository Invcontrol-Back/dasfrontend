import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRepotenciaComponent } from './modal-repotencia.component';

describe('ModalRepotenciaComponent', () => {
  let component: ModalRepotenciaComponent;
  let fixture: ComponentFixture<ModalRepotenciaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalRepotenciaComponent]
    });
    fixture = TestBed.createComponent(ModalRepotenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
