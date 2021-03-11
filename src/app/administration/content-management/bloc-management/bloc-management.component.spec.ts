import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlocManagementComponent } from './bloc-management.component';

describe('BlocManagementComponent', () => {
  let component: BlocManagementComponent;
  let fixture: ComponentFixture<BlocManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlocManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlocManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
