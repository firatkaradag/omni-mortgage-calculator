import { Plan, PrepaymentFrequencyType, PrepaymentErrorType } from "./payment-generics";

export class PrepaymentPlan implements Plan {

    private _prepaymentAmount: string;
    get prepaymentAmount(): string { return this._prepaymentAmount; }
    set prepaymentAmount(prepaymentAmount: string) { this._prepaymentAmount = prepaymentAmount; }

    private _prepaymentFrequency: PrepaymentFrequencyType;
    get prepaymentFrequency(): PrepaymentFrequencyType { return this._prepaymentFrequency; }
    set prepaymentFrequency(prepaymentFrequency: PrepaymentFrequencyType) { this._prepaymentFrequency = prepaymentFrequency; }

    private _startWithPayment: string;
    get startWithPayment(): string { return this._startWithPayment; }
    set startWithPayment(startWithPayment: string) { this._startWithPayment = startWithPayment; }

    constructor(prepaymentAmount?: string, prepaymentFrequency?: PrepaymentFrequencyType, startWithPayment?: string) {
        this._prepaymentAmount = prepaymentAmount ?? '0';
        this._prepaymentFrequency = prepaymentFrequency ?? PrepaymentFrequencyType.EACH_YEAR;
        this._startWithPayment = startWithPayment ?? '1';
    }

    validate = (): Promise<PrepaymentErrorType[] | boolean> => {
        return new Promise(
            (resolve, reject) => { 
                const errors: PrepaymentErrorType[] = []
                const usdRegex = /^(\d*)?((,\d{3})*)?(\.\d{1,2})?$/;

                try {
                    if (usdRegex.test(this._prepaymentAmount)) {
                        const amount = parseFloat(this._prepaymentAmount.replace(/,/g, ''))
                        if (isNaN(amount)) {
                            errors.push(PrepaymentErrorType.PREPAYMENT_AMOUNT);
                        }
                    } else {
                        errors.push(PrepaymentErrorType.PREPAYMENT_AMOUNT);
                    }
                } catch {
                    errors.push(PrepaymentErrorType.PREPAYMENT_AMOUNT);
                }

                try {
                    if (isNaN(Number(this._startWithPayment))) {
                        errors.push(PrepaymentErrorType.START_WITH_PAYMENT);
                    }
                } catch {
                    errors.push(PrepaymentErrorType.START_WITH_PAYMENT);
                }

                if (errors.length > 0) {
                    reject(errors)
                }

                resolve(true);
            }
        );
    }
}
