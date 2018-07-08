import { Methods } from './transaction';

interface NatureOfBusiness {
    manufacturing?: boolean;
    trading?: boolean;
}

export interface Business {
    id?: string;
    uid?: string;
    businessName?: string;
    about?: string;
    phone?: string;
    confirm?: boolean;
    email?: string;
    depreciation?: Methods;
    freePackage?: boolean; // false means block from using free package
    website?: string;
    block?: boolean; // true means block from using the software due default in subscription
    category?: string;
    manufacturing?: boolean;
    business?: NatureOfBusiness;
    location?: string;
    trading?: boolean;
    created?: number;
    updated?: number;
}
