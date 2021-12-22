import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { PrepaymentPlan, PrepaymentFrequencyType, PrepaymentErrorType, PaymentError } from 'src/app/models';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { CurrencyPipe } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { AlertComponent } from '../../shared';

@Component({
  selector: 'app-prepayment-plan',
  templateUrl: './prepayment-plan.component.html',
  styleUrls: ['./prepayment-plan.component.sass']
})
export class PrepaymentPlanComponent implements OnInit {

  @Input() plan!: PrepaymentPlan;
  @Input() set errors(errors: PaymentError[]) {
    this.resetErrors();
    for (let error of errors) {
      switch (error.type) {
        case PrepaymentErrorType.PREPAYMENT_AMOUNT:
          this.prepaymentAmountDisplay = true;
          this.prepaymentAmountMessage = `${error.id} ${error.type}`
          break;
        case PrepaymentErrorType.START_WITH_PAYMENT:
          this.startWithErrorDisplay = true;
          this.startWithErrorMessage = `${error.id} ${error.type}`
          break;
      }
    }
  }

  prepaymentAmountDisplay = false
  prepaymentAmountMessage = ''
  startWithErrorDisplay = false
  startWithErrorMessage = ''

  @ViewChild('prepaymentAmountInfo') prepaymentAmountInfo!: AlertComponent;
  @ViewChild('prepaymentFrequencyInfo') prepaymentFrequencyInfo!: AlertComponent;
  @ViewChild('startWithPaymentInfo') startWithPaymentInfo!: AlertComponent;

  INFO_PREPAYMENT_AMOUNT = "Amount that you will prepay on your mortgage. This amount will be applied to the mortgage principal balance, at a frequency of prepayments that you determine.";
  INFO_PREPAYMENT_FREQUENCY = "The frequency under which you will make prepayments on your mortgage. The options are one time payment, yearly and the same as regular payment.";
  INFO_PREPAYMENT_START_WITH = "This is the payment number that your prepayments will begin with. For a one time payment, this is the payment number that the single prepayment will be included in. All prepayments of principal are assumed to be received by your lender in time to be included in the following month's interest calculation.";
  
  faQuestionCircle = faQuestionCircle
  prepaymentFrequencies = Object.values(PrepaymentFrequencyType)
  constructor(private currencyPipe: CurrencyPipe, private fb: FormBuilder) { }

  PrepaymentErrorType = PrepaymentErrorType;

  prepaymentPlanForm = this.fb.group({
    prepaymentAmount: [''],
    prepaymentFrequency: [''],
    startWithPayment: [''],
  });

  ngOnInit(): void {
    this.prepaymentPlanForm.valueChanges.subscribe((form) => {
      this.plan.prepaymentAmount = form.prepaymentAmount;
      this.plan.prepaymentFrequency = form.prepaymentFrequency;
      this.plan.startWithPayment = form.startWithPayment;
    })

    if (this.plan) {
      this.prepaymentPlanForm.patchValue({
        prepaymentAmount: this.currencyPipe.transform(this.plan?.prepaymentAmount, ' '),
        prepaymentFrequency: this.plan.prepaymentFrequency,
        startWithPayment: this.plan.startWithPayment,
      })
    }
  }

  resetErrors = () => {
    this.prepaymentAmountDisplay = false
    this.prepaymentAmountMessage = ''
    this.startWithErrorDisplay = false
    this.startWithErrorMessage = ''
  }

}
