import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from '../payment/payment.component';
import { PaymentPlanComponent } from './payment-plan/payment-plan.component';
import { PrepaymentPlanComponent } from './prepayment-plan/prepayment-plan.component';



@NgModule({
  declarations: [
    PaymentComponent,
    PaymentPlanComponent,
    PrepaymentPlanComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PaymentModule { }
