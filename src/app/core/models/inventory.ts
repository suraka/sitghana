
export interface Supplier {
    id?: string;
    uid?: string;
    bid?: string;
    name?: string;
    email?: string;
    phone?: string;
    location?: string;
    business?: string;
    created?: number;
    updated?: number;
}

export interface Customer {
    id?: string;
    uid?: string;
    bid?: string;
    name?: string;
    email?: string;
    phone?: string;
    location?: string;
    business?: string;
    created?: number;
    updated?: number;
}

export interface RawMaterial {
    id?: string;
    uid?: string;
    bid?: string;
    name?: string;
    supplier?: Supplier;
    created?: number;
    updated?: number;
}

export interface WorkInProgress {
    id?: string;
    uid?: string;
    bid?: string;
    date?: number;
    name?: string;
    valuation?: {
        materials?: number; // value of materials in production process but not yet completed
        directCost?: number; // value of wages & other expenses directly incurred but not yet completed
        overheads?: number; // value of all indirect epenses ivolved in the production but not yet completed
    };
    created?: number;
    updated?: number;
}

export interface FinishedGood {
    id?: string;
    uid?: string;
    bid?: string;
    name?: string;
    customer?: Customer;
    created?: number;
    updated?: number;
}

export interface FactoryExpenditure {
    id?: string;
    uid?: string;
    bid?: string;
    name?:  string;
    type?: string;
    amount?: number;
    description?: string;
    created?: number;
    updated?: number;
}

export interface Inventory {
    id?: string;
    uid?: string;
    bid?: string;
    date?: number;
    type?: string; // raw material || work in progress || finished goods
    rawMaterial?: RawMaterial;
    workInProgress?: WorkInProgress;
    finishedGood?: FinishedGood;
    quantity?: number;
    price?: number;
    created?: number;
    updated?: number;
}

