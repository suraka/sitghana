export interface Roles {
    subscriber?: boolean;
    editor?: boolean;
    admin?: boolean;
}

export interface User {
    uid?: string;
    displayName?: string;
    phone?: string;
    email?: string;
    status?: boolean;
    block?: boolean;
    roles?: Roles;
    created?: number;
    updated?: number;
}
