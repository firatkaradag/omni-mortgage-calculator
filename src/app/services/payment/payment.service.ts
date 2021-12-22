import { Injectable } from '@angular/core';
import { Plan, PaymentErrorType, PrepaymentErrorType } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  validate(plan: Plan): Promise<PaymentErrorType[] | PrepaymentErrorType[] | boolean> {
    return plan.validate();
  }
}
