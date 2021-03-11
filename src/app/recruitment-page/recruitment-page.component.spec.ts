import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitmentPageComponent } from './recruitment-page.component';

describe('RecruitmentPageComponent', () => {
  let component: RecruitmentPageComponent;
  let fixture: ComponentFixture<RecruitmentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecruitmentPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruitmentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
