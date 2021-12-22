import { Component, Input } from "@angular/core";
import { PaymentError, PaymentPlan, PrepaymentPlan } from "src/app/models";

@Component({selector: 'app-alert', template: ''})
export class AlertStubComponent {
    @Input() alert!: string;
    @Input() type!: string;
    @Input() display?: boolean = false;
}

@Component({selector: 'app-payment-plan', template: ''})
export class PaymentPlanStubComponent {
    @Input() plan!: PaymentPlan;
    @Input() errors?: PaymentError[];
  }

@Component({selector: 'app-prepayment-plan', template: ''})
export class PrepaymentPlanStubComponent {
    @Input() plan!: PrepaymentPlan;
    @Input() errors?: PaymentError[];
}