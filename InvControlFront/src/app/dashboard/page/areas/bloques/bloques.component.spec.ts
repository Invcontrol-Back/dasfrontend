import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloquesComponent } from './bloques.component';

describe('BloquesComponent', () => {
  let component: BloquesComponent;
  let fixture: ComponentFixture<BloquesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BloquesComponent]
    });
    fixture = TestBed.createComponent(BloquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
