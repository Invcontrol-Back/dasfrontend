import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvSoftwareComponent } from './inv-software.component';

describe('InvSoftwareComponent', () => {
  let component: InvSoftwareComponent;
  let fixture: ComponentFixture<InvSoftwareComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvSoftwareComponent]
    });
    fixture = TestBed.createComponent(InvSoftwareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
