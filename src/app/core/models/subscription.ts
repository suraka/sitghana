export interface Subscription {
    id?: string;
    uid?: string; // client or user id
    bid?: string; // product id
    expires?: number;
    confirm?: boolean;
    package?: string; // trial 30 days, basic 180 days, and premium 365 days
    price?: number;
    created?: number;
    updated?: number;
}
