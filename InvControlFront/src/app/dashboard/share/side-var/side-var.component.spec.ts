import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideVarComponent } from './side-var.component';

describe('SideVarComponent', () => {
  let component: SideVarComponent;
  let fixture: ComponentFixture<SideVarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SideVarComponent]
    });
    fixture = TestBed.createComponent(SideVarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
