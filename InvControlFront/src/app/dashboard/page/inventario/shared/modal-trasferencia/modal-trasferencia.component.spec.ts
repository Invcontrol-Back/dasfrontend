import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTrasferenciaComponent } from './modal-trasferencia.component';

describe('ModalTrasferenciaComponent', () => {
  let component: ModalTrasferenciaComponent;
  let fixture: ComponentFixture<ModalTrasferenciaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalTrasferenciaComponent]
    });
    fixture = TestBed.createComponent(ModalTrasferenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
