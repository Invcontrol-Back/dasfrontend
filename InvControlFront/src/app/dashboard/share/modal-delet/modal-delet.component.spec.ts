import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeletComponent } from './modal-delet.component';

describe('ModalDeletComponent', () => {
  let component: ModalDeletComponent;
  let fixture: ComponentFixture<ModalDeletComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalDeletComponent]
    });
    fixture = TestBed.createComponent(ModalDeletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
