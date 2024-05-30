import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalizacionesComponent } from './localizaciones.component';

describe('LocalizacionesComponent', () => {
  let component: LocalizacionesComponent;
  let fixture: ComponentFixture<LocalizacionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocalizacionesComponent]
    });
    fixture = TestBed.createComponent(LocalizacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
