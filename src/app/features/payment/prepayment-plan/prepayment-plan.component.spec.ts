import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepaymentPlanComponent } from './prepayment-plan.component';

describe('PrepaymentPlanComponent', () => {
  let component: PrepaymentPlanComponent;
  let fixture: ComponentFixture<PrepaymentPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrepaymentPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrepaymentPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
