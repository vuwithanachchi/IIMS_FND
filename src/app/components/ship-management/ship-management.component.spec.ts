import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipManagementComponent } from './ship-management.component';

describe('ShipManagementComponent', () => {
  let component: ShipManagementComponent;
  let fixture: ComponentFixture<ShipManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
