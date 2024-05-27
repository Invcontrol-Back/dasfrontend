import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponenteComponent } from './modal-componente.component';

describe('ModalComponenteComponent', () => {
  let component: ModalComponenteComponent;
  let fixture: ComponentFixture<ModalComponenteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalComponenteComponent]
    });
    fixture = TestBed.createComponent(ModalComponenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
