import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvTecnologicoComponent } from './inv-tecnologico.component';

describe('InvTecnologicoComponent', () => {
  let component: InvTecnologicoComponent;
  let fixture: ComponentFixture<InvTecnologicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvTecnologicoComponent]
    });
    fixture = TestBed.createComponent(InvTecnologicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
