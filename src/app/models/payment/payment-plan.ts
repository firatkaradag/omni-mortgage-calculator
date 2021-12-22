import { Plan, PaymentFrequencyType, PaymentErrorType } from "./payment-generics";

export class PaymentPlan implements Plan {

    private _mortgageAmount: string;
    get mortgageAmount(): string { return this._mortgageAmount; }
    set mortgageAmount(mortgageAmount: string) { this._mortgageAmount = mortgageAmount; }

    private _interestRate: string;
    get interestRate(): string { return this._interestRate; }
    set interestRate(interestRate: string) { this._interestRate = interestRate; }

    private _amortizationPeriodYear: number;
    get amortizationPeriodYear(): number { return this._amortizationPeriodYear; }
    set amortizationPeriodYear(amortizationPeriodYear: number) { this._amortizationPeriodYear = amortizationPeriodYear; }

    private _amortizationPeriodMonth: number;
    get amortizationPeriodMonth(): number { return this._amortizationPeriodMonth; }
    set amortizationPeriodMonth(amortizationPeriodMonth: number) { this._amortizationPeriodMonth = amortizationPeriodMonth; }

    private _paymentFrequency: PaymentFrequencyType;
    get paymentFrequency(): PaymentFrequencyType { return this._paymentFrequency; }
    set paymentFrequency(paymentFrequency: PaymentFrequencyType) { this._paymentFrequency = paymentFrequency; }

    private _paymentTerm: number;
    get paymentTerm(): number { return this._paymentTerm; }
    set paymentTerm(paymentTerm: number) { this._paymentTerm = paymentTerm; }

    constructor(mortgageAmount?: string, interestRate?: string, amortizationPeriodYear?: number, paymentFrequency?: PaymentFrequencyType, paymentTerm?: number) {
        this._mortgageAmount = mortgageAmount ?? '100000';
        this._interestRate = interestRate ?? '5';
        this._amortizationPeriodYear = amortizationPeriodYear ?? 25;
        this._amortizationPeriodMonth = 0;
        this._paymentFrequency = paymentFrequency ?? PaymentFrequencyType.MONTHLY;
        this._paymentTerm = paymentTerm ?? 5;
    }

    validate = (): Promise<PaymentErrorType[] | boolean> => {
        return new Promise(
            (resolve, reject) => { 
                const errors: PaymentErrorType[] = [];
                const usdRegex = /^(\d*)?((,\d{3})*)?(\.\d{1,2})?$/;
                try {
                    if (usdRegex.test(this._mortgageAmount)) {
                        const amount = parseFloat(this._mortgageAmount.replace(/,/g, ''))
                        if (isNaN(amount) || !(amount > 0)) {
                            errors.push(PaymentErrorType.MORTGAGE_AMOUNT);
                        }
                    } else {
                        errors.push(PaymentErrorType.MORTGAGE_AMOUNT);
                    }
                } catch (error) {
                    errors.push(PaymentErrorType.MORTGAGE_AMOUNT);
                }

                const percentageRegex = /^(\d*)?(\.\d{1,2})?$/;
                try {
                    const percentage = parseFloat(this._interestRate);
                    if (!percentageRegex.test(this._interestRate) || isNaN(percentage)) {
                        errors.push(PaymentErrorType.INTEREST_RATE);
                    } else {
                        if (!(percentage > 0 && percentage <= 100)) {
                            errors.push(PaymentErrorType.INTEREST_RATE);
                        }
                    }
                } catch {
                    errors.push(PaymentErrorType.INTEREST_RATE);
                }

                try {
                    if (this._amortizationPeriodYear == 0) {
                        errors.push(PaymentErrorType.AMORTIZATION_PERIOD);
                    }
                } catch {
                    errors.push(PaymentErrorType.AMORTIZATION_PERIOD);
                }

                if (errors.length > 0) {
                    reject(errors)
                }

                resolve(true);
            }
        );
    }
}
