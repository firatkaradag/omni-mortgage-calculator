import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { PaymentPlan, PaymentFrequencyType, PaymentError, PaymentErrorType } from 'src/app/models';
import { faQuestionCircle, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { CurrencyPipe } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { AlertComponent } from '../../shared';

@Component({
  selector: 'app-payment-plan',
  templateUrl: './payment-plan.component.html',
  styleUrls: ['./payment-plan.component.sass'],
})
export class PaymentPlanComponent implements OnInit {

  @Input() plan!: PaymentPlan;
  @Input() set errors(errors: PaymentError[]) {
    this.resetErrors();
    for (let error of errors) {
      switch (error.type) {
        case PaymentErrorType.MORTGAGE_AMOUNT:
          this.mortgageAmountErrorDisplay = true;
          this.mortgageAmountErrorMessage = `${error.id} ${error.type}`
          break;
        case PaymentErrorType.INTEREST_RATE:
          this.interestRateErrorDisplay = true;
          this.interestRateErrorMessage = `${error.id} ${error.type}`
          break;
        case PaymentErrorType.AMORTIZATION_PERIOD:
          this.amortizationPeriodErrorDisplay = true;
          this.amortizationPeriodErrorMessage = `${error.id} ${error.type}`
          break;
      }
    }
  }

  paymentErrors: PaymentError[] = []
  mortgageAmountErrorDisplay = false 
  interestRateErrorDisplay = false
  amortizationPeriodErrorDisplay = false

  mortgageAmountErrorMessage = ''
  interestRateErrorMessage = ''
  amortizationPeriodErrorMessage = ''

  @ViewChild('mortgageAmountInfo') mortgageAmountInfo!: AlertComponent;
  @ViewChild('interestRateInfo') interestRateInfo!: AlertComponent;
  @ViewChild('amortizationPeriodInfo') amortizationPeriodInfo!: AlertComponent;
  @ViewChild('paymentFrequencyInfo') paymentFrequencyInfo!: AlertComponent;
  @ViewChild('paymentTermInfo') paymentTermInfo!: AlertComponent;

  INFO_MORTGAGE_AMOUNT = "The amount you expect to borrow from your financial institution. It is calculated as the purchase price of your home, minus the down payment plus any applicable mortgage loan insurance premium you have to pay.";
  INFO_INTEREST_RATE = "Annual interest rate for this mortgage.";
  INFO_AMORTIZATION_PERIOD = "The number of years and months over which you will repay this loan. The most common amortization period is 25 years. Not to be confused with the term of your loan, which is the duration of the loan agreement you signed with your financial institution and that has to be renewed regularly. Terms are generally for 1 to 10 years.";
  INFO_PAYMENT_FREQUENCY = "By choosing an accelerated payment frequency, you can reduce your amortization period and save thousands of dollars in interest in the long run. For example, the accelerated bi-weekly payment allows you to pay half of your monthly payment every two weeks. You will therefore make 26 payments a year, the equivalent of one extra monthly payment a year.";
  INFO_PAYMENT_TERM = "The number of term years.";

  faQuestionCircle = faQuestionCircle
  faInfoCircle = faInfoCircle
  amortizationPeriodYears = [...Array(30).keys()].map(year => year+1)
  amortizationPeriodMonths = [...Array(11).keys()].map(month => month+1)
  terms = [...Array(10).keys()].map(term => term+1)
  paymentFrequencies = Object.values(PaymentFrequencyType)
  constructor(private currencyPipe: CurrencyPipe, private fb: FormBuilder) { }

  paymentPlanForm = this.fb.group({
    mortgageAmount: [''],
    interestRate: [''],
    amortizationPeriodYear: [''],
    amortizationPeriodMonth: [''],
    paymentFrequency: [''],
    paymentTerm: ['']
  });

  ngOnInit(): void { 

    this.paymentPlanForm.valueChanges.subscribe((form) => {
      this.plan.mortgageAmount = form.mortgageAmount;
      this.plan.interestRate = form.interestRate;
      this.plan.amortizationPeriodYear = form.amortizationPeriodYear;
      this.plan.amortizationPeriodMonth = form.amortizationPeriodMonth;
      this.plan.paymentFrequency = form.paymentFrequency;
      this.plan.paymentTerm = form.paymentTerm;
    })

    if (this.plan) {
      this.paymentPlanForm.patchValue({
        mortgageAmount: this.currencyPipe.transform(this.plan.mortgageAmount, ' '),
        interestRate: this.plan.interestRate,
        amortizationPeriodYear: this.plan.amortizationPeriodYear,
        amortizationPeriodMonth: this.plan.amortizationPeriodMonth,
        paymentFrequency: this.plan.paymentFrequency,
        paymentTerm: this.plan.paymentTerm
      })
    }
  }

  resetErrors = () => {
    this.mortgageAmountErrorDisplay = false 
    this.interestRateErrorDisplay = false
    this.amortizationPeriodErrorDisplay = false
    this.mortgageAmountErrorMessage = ''
    this.interestRateErrorMessage = ''
    this.amortizationPeriodErrorMessage = ''
  }
}
