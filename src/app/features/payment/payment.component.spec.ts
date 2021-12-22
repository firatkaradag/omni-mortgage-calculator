import { CurrencyPipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentErrorType, PaymentPlan, PrepaymentErrorType, PrepaymentPlan } from 'src/app/models';
import { PaymentService } from 'src/app/services';
import { PaymentPlanStubComponent, PrepaymentPlanStubComponent } from 'src/app/__mocks__';

import { PaymentComponent } from './payment.component';

describe('PaymentComponent', () => {
  let component: PaymentComponent;
  let fixture: ComponentFixture<PaymentComponent>;
  let compiled: HTMLElement;
  let paymentService: PaymentService;
  
  let paymentPlan: PaymentPlan = new PaymentPlan();
  let prepaymentPlan: PrepaymentPlan = new PrepaymentPlan();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentComponent, PaymentPlanStubComponent, PrepaymentPlanStubComponent ],
      providers: [PaymentService, CurrencyPipe]
    })
    .compileComponents();
  });

  beforeEach(() => {
    paymentService = new PaymentService();
    fixture = TestBed.createComponent(PaymentComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('PaymentService', () => {

    describe('PaymentPlan', () => {

      beforeEach(() => { paymentPlan = new PaymentPlan(); });

      it('should validate Payment Plan', async () => {
        const valid = await paymentService.validate(paymentPlan);
        expect(valid).toEqual(true);
      });

      it('should catch MORTGAGE_AMOUNT error', async () => {
        paymentPlan.mortgageAmount = 'not-a-number';
        await paymentService.validate(paymentPlan).catch(errors => {
          expect(errors).toBeInstanceOf(Array);
          expect(errors[0]).toEqual(PaymentErrorType.MORTGAGE_AMOUNT as string);
        });
      });      

      it('should catch INTEREST_RATE error', async () => {
        paymentPlan.interestRate = 'not-a-number';
        await paymentService.validate(paymentPlan).catch(errors => {
          expect(errors).toBeInstanceOf(Array);
          expect(errors[0]).toEqual(PaymentErrorType.INTEREST_RATE as string);
        });
      });      

      it('should catch AMORTIZATION_PERIOD error', async () => {
        paymentPlan.amortizationPeriodYear = 0;
        await paymentService.validate(paymentPlan).catch(errors => {
          expect(errors).toBeInstanceOf(Array);
          expect(errors[0]).toEqual(PaymentErrorType.AMORTIZATION_PERIOD as string);
        });
      });      
    })

    describe('PrepaymentPlan', () => {

      beforeEach(() => { prepaymentPlan = new PrepaymentPlan(); });

      it('should validate Prepayment Plan', async () => {
        const valid = await paymentService.validate(prepaymentPlan);
        expect(valid).toEqual(true);
      });

      it('should catch PREPAYMENT_AMOUNT error', async () => {
        prepaymentPlan.prepaymentAmount = 'not-a-number';
        await paymentService.validate(prepaymentPlan).catch(errors => {
          expect(errors).toBeInstanceOf(Array);
          expect(errors[0]).toEqual(PrepaymentErrorType.PREPAYMENT_AMOUNT as string);
        });
      });

      it('should catch START_WITH_PAYMENT error', async () => {
        prepaymentPlan.startWithPayment = 'not-a-number';
        await paymentService.validate(prepaymentPlan).catch(errors => {
          expect(errors).toBeInstanceOf(Array);
          expect(errors[0]).toEqual(PrepaymentErrorType.START_WITH_PAYMENT as string);
        });
      });
    })
  })

  describe('PaymentSummaryTable', () => {

    it('should render Number of Payments', () => {
      expect(compiled.querySelector('[name="term-number-of-payments"]')?.textContent).toEqual('60');
      expect(compiled.querySelector('[name="amortization-period-number-of-payments"]')?.textContent).toEqual('300');
    })

    it('should render Mortgage Payment', () => {
      expect(compiled.querySelector('[name="term-mortgage-payment"]')?.textContent).toEqual('$584.59');
      expect(compiled.querySelector('[name="amortization-period-mortgage-payment"]')?.textContent).toEqual('$584.59');
    })

    it('should render Prepayment', () => {
      expect(compiled.querySelector('[name="term-prepayment"]')?.textContent).toEqual('$0.00');
      expect(compiled.querySelector('[name="amortization-period-prepayment"]')?.textContent).toEqual('$0.00');
    })

    it('should render Principal Payments', () => {
      expect(compiled.querySelector('[name="term-principal-payments"]')?.textContent).toEqual('$11,635.32');
      expect(compiled.querySelector('[name="amortization-period-principal-payments"]')?.textContent).toEqual('$100,000.00');
    })

    it('should render Interest Payments', () => {
      expect(compiled.querySelector('[name="term-interest-payments"]')?.textContent).toEqual('$23,440.09');
      expect(compiled.querySelector('[name="amortization-period-interest-payments"]')?.textContent).toEqual('$75,377.01');
    })

    it('should render Total Cost', () => {
      expect(compiled.querySelector('[name="term-total-cost"]')?.textContent).toEqual('$35,075.40');
      expect(compiled.querySelector('[name="amortization-period-total-cost"]')?.textContent).toEqual('$175,377.01');
    })
  })
});
