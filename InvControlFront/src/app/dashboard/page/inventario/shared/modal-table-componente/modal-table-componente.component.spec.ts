import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTableComponenteComponent } from './modal-table-componente.component';

describe('ModalTableComponenteComponent', () => {
  let component: ModalTableComponenteComponent;
  let fixture: ComponentFixture<ModalTableComponenteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalTableComponenteComponent]
    });
    fixture = TestBed.createComponent(ModalTableComponenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
