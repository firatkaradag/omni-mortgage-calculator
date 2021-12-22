import { CurrencyPipe } from '@angular/common';
import { AlertStubComponent } from 'src/app/__mocks__';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { PaymentPlanComponent } from './payment-plan.component';

describe('PaymentPlanComponent', () => {
  let component: PaymentPlanComponent;
  let fixture: ComponentFixture<PaymentPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentPlanComponent, AlertStubComponent ],
      providers: [CurrencyPipe, FormBuilder]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
