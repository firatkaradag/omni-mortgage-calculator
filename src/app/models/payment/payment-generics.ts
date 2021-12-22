export interface Plan {
    validate(): Promise<PaymentErrorType[] | PrepaymentErrorType[] | boolean>;
}

export interface PaymentSummary {
    numberOfPayments: string | number;
    mortgagePayment: string;
    prepayment: string;
    principalPayments: string;
    interestPayments: string;
    totalCost: string;
}

export enum PaymentFrequencyType {
    ACCELERATED_WEEKLY = "Accelerated Weekly",
    WEEKLY = "Weekly",
    ACCELERATED_BIWEEKLY = "Accelerated Bi-weekly",
    BIWEEKLY = "Bi-weekly (every 2 weeks)",
    SEMI_MONTHLY = "Semi-monthly (24x per year)",
    MONTHLY = "Monthly (12x per year)"
}

export const paymentFrequencyPeriod = (type: PaymentFrequencyType): number => {
    switch(type) {
        case PaymentFrequencyType.ACCELERATED_WEEKLY: return 52;
        case PaymentFrequencyType.WEEKLY: return 52;
        case PaymentFrequencyType.ACCELERATED_BIWEEKLY: return 24;
        case PaymentFrequencyType.BIWEEKLY: return 24;
        case PaymentFrequencyType.MONTHLY: return 12;
        default: return 1;
    }
}

export enum PrepaymentFrequencyType {
    ONE_TIME = "One time",
    EACH_YEAR = "Each year",
    SAME_AS_REGULAR_PAYMENT = "Same as regular payment"
}

export interface PaymentError {
    id: string;
    type: PaymentErrorType | PrepaymentErrorType;
}

export enum PaymentErrorType {
    MORTGAGE_AMOUNT = 'Please enter an amount greater than 0 with a maximum of 2 decimal places. Enter "." as a decimal separator and "," as a thousand separator.',
    INTEREST_RATE = 'Please enter a percent greater than 0 and less than 100 with a maximum of 2 decimal places. Enter "." as a decimal separator.',
    AMORTIZATION_PERIOD = "The value you entered in the field 'Amortization Period' is not valid.",
}

export enum PrepaymentErrorType {
    PREPAYMENT_AMOUNT = 'Please enter an amount greater than or equal to 0 with a maximum of 2 decimal places. Enter "." as a decimal separator and "," as a thousand separator.',
    START_WITH_PAYMENT = "Please enter a valid whole number greater than 0"
}