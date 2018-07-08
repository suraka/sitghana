export interface Methods {
    straightLine?: boolean;
    doubleDecliningBalance?: boolean;
    unitsOfProduction?: boolean;
    sumOfYearsDigits?: boolean;
}

export interface Reports {
    trial?: boolean;
    manufacturing?: boolean;
    trading?: boolean;
    pl?: boolean;
    bs?: boolean;
    is?: boolean;
}

export interface Transaction {
    id?: string;
    uid?: string;
    bid?: string;
    account?: string; // dr or cr
    appearsIn?: Reports; // trial, manufacturing, trading, p & l (pl), balance sheet (bs), income statement (is)
    adjust?: boolean;
    date?: string;
    depreciation?: Methods;
    description?: string;
    nature?: string;
    category?: string;
    cashPayment?: boolean;
    creditPayment?: boolean;
    qty?: number;
    price?: number;
    created?: number;
    updated?: number;
}
