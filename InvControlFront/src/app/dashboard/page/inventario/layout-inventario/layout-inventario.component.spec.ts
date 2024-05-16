import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutInventarioComponent } from './layout-inventario.component';

describe('LayoutInventarioComponent', () => {
  let component: LayoutInventarioComponent;
  let fixture: ComponentFixture<LayoutInventarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutInventarioComponent]
    });
    fixture = TestBed.createComponent(LayoutInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
