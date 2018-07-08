export interface Ad {
    id?: string;
    aid: string;
    title: string;
    content: string;
    type: string;
    price: number;
    category: string;
    url: any | null;
    filenames: any | null;
    views: number;
    region: string;
    town: string;
    escrow: boolean;
    phone: string;
    uid: any;
    time: number;
    expire: number;
    updated: number;
    public: boolean;
}
