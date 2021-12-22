import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { 
  PaymentPlan, PrepaymentPlan, PaymentError, 
  PaymentErrorType, PrepaymentErrorType, PaymentSummary,
  paymentFrequencyPeriod
} from 'src/app/models';
import { PaymentService } from 'src/app/services';
import { PaymentPlanComponent } from './payment-plan/payment-plan.component';
import { PrepaymentPlanComponent } from './prepayment-plan/prepayment-plan.component';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.sass']
})
export class PaymentComponent implements OnInit {

  @ViewChild(PaymentPlanComponent) paymentPlanComponent!: PaymentPlanComponent
  @ViewChild(PrepaymentPlanComponent) prepaymentPlanComponent!: PrepaymentPlanComponent

  paymentErrors: PaymentError[] = []
  prepaymentErrors: PaymentError[] = []

  paymentPlan = new PaymentPlan();
  prepaymentPlan = new PrepaymentPlan();

  term = {} as PaymentSummary;
  amortizationPeriod = {} as PaymentSummary;

  constructor(private paymentService: PaymentService, private currencyPipe: CurrencyPipe) { }
  ngOnInit(): void { this.calculatePaymentSummary(); }
  calculate(): void { 

    let index = 1;
    this.paymentErrors = [];
    this.prepaymentErrors = [];

    const paymentPlanValidation = this.paymentService.validate(this.paymentPlanComponent.plan)
      .catch(errors => {
        this.paymentErrors = [...(errors as PaymentErrorType[]).map(type => {
          return { id: `Error ${index++}:`, type: type } 
        })]
      })

    
    const prepaymentPlanValidation = this.paymentService.validate(this.prepaymentPlanComponent.plan)
      .catch(errors => {
        this.prepaymentErrors = [...(errors as PrepaymentErrorType[]).map(type => {
          return { id: `Error ${index++}:`, type: type } 
        })]
      })

    Promise.all([paymentPlanValidation, prepaymentPlanValidation])
    .then(() => {
      if (index === 1) {

        this.calculatePaymentSummary();
      }
    })
  }

  calculatePaymentSummary() {
    
    let total, rate, prepayment;
    try {
      total = parseFloat(this.paymentPlan.mortgageAmount.replace(/,/g, ''))
      rate = parseFloat(this.paymentPlan.interestRate.replace(/,/g, ''))
      prepayment = parseFloat(this.prepaymentPlan.prepaymentAmount.replace(/,/g, ''))
    } catch {
      this.term = {} as PaymentSummary;
      this.amortizationPeriod = {} as PaymentSummary;
      return;
    }
    
    const paymentFrequency = paymentFrequencyPeriod(this.paymentPlan.paymentFrequency);
    const numberOfPaymentsTerm = this.getNumberOfPayments(paymentFrequency, this.paymentPlan.paymentTerm);
    const numberOfPaymentsTotal = this.getNumberOfPayments(paymentFrequency, this.paymentPlan.amortizationPeriodYear) + this.paymentPlan.amortizationPeriodMonth;
    
    const paymentTotal = this.calculateMonthlyPayment(total, rate, numberOfPaymentsTotal);
    const totalPrincipalTerm = this.calculatePrincipalPayment(total, rate, paymentTotal, numberOfPaymentsTerm);

    const totalInterestTotal = this.calculateTotalInterest(total, numberOfPaymentsTotal, paymentTotal);
    const totalInterestTerm = this.calculateTotalInterest(totalPrincipalTerm, numberOfPaymentsTerm, paymentTotal);
    
    const totalCostTerm = paymentTotal * numberOfPaymentsTerm;
    const totalCostTotal = paymentTotal * numberOfPaymentsTotal;

    this.term = {
      numberOfPayments: numberOfPaymentsTerm,
      mortgagePayment: this.getCurrency(this.roundDecimal(paymentTotal)),
      prepayment: this.getCurrency(prepayment),
      principalPayments: this.getCurrency(this.roundDecimal(totalPrincipalTerm)),
      interestPayments: this.getCurrency(this.roundDecimal(totalInterestTerm)),
      totalCost: this.getCurrency(this.roundDecimal(totalCostTerm))
    }

    this.amortizationPeriod = {
      numberOfPayments: numberOfPaymentsTotal,
      mortgagePayment: this.getCurrency(this.roundDecimal(paymentTotal)),
      prepayment: this.getCurrency(prepayment),
      principalPayments: this.getCurrency(this.roundDecimal(totalCostTotal - totalInterestTotal)),
      interestPayments: this.getCurrency(this.roundDecimal(totalInterestTotal)),
      totalCost: this.getCurrency(this.roundDecimal(totalCostTotal))
    }
  }

  getCurrency = (amount: number): string => this.currencyPipe.transform(amount, '$') ?? '';
  getNumberOfPayments = (frequency: number, term: number) => { return frequency * term }

  roundDecimal = (n: number): number => { return Math.round((n + Number.EPSILON) * 100) / 100; }
  calculateMonthlyPayment = (total: number, percentage: number, term: number): number => {
    const rate = percentage / 100 / 12;
    const powRate = Math.pow((1 + rate), term);
    const payment = total * (rate * powRate) / (powRate - 1);
    return payment;
  }

  calculateTotalInterest = (total: number, term: number, payment: number): number => {
    return (payment * term) - total;
  }

  calculatePrincipalPayment = (total: number, percentage: number, payment: number, term: number): number => {
    
    const rate = percentage / 100 / 12;
    const interest = total * rate;
    const principal = payment - interest;


    if (term == 0) {
      return principal;
    }
    term--;
    total = total - principal;
    return principal + this.calculatePrincipalPayment(total, percentage, payment, term);
  }
}
