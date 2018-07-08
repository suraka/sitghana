export interface Notification {
    sender_id?: string; // admin id
    reciever_id?: string;
    type?: string; // subscription, account balance
    content?: string;
    expire?: number;
    created?: number;
}
