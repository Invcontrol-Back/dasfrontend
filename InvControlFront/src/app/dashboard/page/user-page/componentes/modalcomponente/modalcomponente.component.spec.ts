import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalcomponenteComponent } from './modalcomponente.component';

describe('ModalcomponenteComponent', () => {
  let component: ModalcomponenteComponent;
  let fixture: ComponentFixture<ModalcomponenteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalcomponenteComponent]
    });
    fixture = TestBed.createComponent(ModalcomponenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
