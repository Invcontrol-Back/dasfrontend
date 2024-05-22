import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvComponentesComponent } from './inv-componentes.component';

describe('InvComponentesComponent', () => {
  let component: InvComponentesComponent;
  let fixture: ComponentFixture<InvComponentesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvComponentesComponent]
    });
    fixture = TestBed.createComponent(InvComponentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
