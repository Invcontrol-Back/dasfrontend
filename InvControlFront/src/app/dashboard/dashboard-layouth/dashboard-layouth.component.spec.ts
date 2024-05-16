import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardLayouthComponent } from './dashboard-layouth.component';

describe('DashboardLayouthComponent', () => {
  let component: DashboardLayouthComponent;
  let fixture: ComponentFixture<DashboardLayouthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardLayouthComponent]
    });
    fixture = TestBed.createComponent(DashboardLayouthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
