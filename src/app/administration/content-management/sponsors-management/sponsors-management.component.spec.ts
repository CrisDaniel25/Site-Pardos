import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorsManagementComponent } from './sponsors-management.component';

describe('SponsorsManagementComponent', () => {
  let component: SponsorsManagementComponent;
  let fixture: ComponentFixture<SponsorsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SponsorsManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
