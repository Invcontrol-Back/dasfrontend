import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSubcatComponent } from './form-subcat.component';

describe('FormSubcatComponent', () => {
  let component: FormSubcatComponent;
  let fixture: ComponentFixture<FormSubcatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormSubcatComponent]
    });
    fixture = TestBed.createComponent(FormSubcatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
