import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvNoTecnologicoComponent } from './inv-no-tecnologico.component';

describe('InvNoTecnologicoComponent', () => {
  let component: InvNoTecnologicoComponent;
  let fixture: ComponentFixture<InvNoTecnologicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvNoTecnologicoComponent]
    });
    fixture = TestBed.createComponent(InvNoTecnologicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
