import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCatComponent } from './form-cat.component';

describe('FormCatComponent', () => {
  let component: FormCatComponent;
  let fixture: ComponentFixture<FormCatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormCatComponent]
    });
    fixture = TestBed.createComponent(FormCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
