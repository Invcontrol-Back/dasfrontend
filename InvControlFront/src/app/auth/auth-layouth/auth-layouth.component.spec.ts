import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthLayouthComponent } from './auth-layouth.component';

describe('AuthLayouthComponent', () => {
  let component: AuthLayouthComponent;
  let fixture: ComponentFixture<AuthLayouthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthLayouthComponent]
    });
    fixture = TestBed.createComponent(AuthLayouthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
