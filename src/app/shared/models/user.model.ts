import { AuthService } from "../services/auth.service";

export interface Roles {
    admin?: boolean;
    reviewer?: boolean;
    approver?: boolean;
    appUser: boolean;
}

export class User {
    id: string;
    email: string;
    photoUrl: string;
    roles: Roles;

    constructor(authData) {
        this.email = authData.email;
        this.photoUrl = authData.photoUrl || null;
        this.id = authData.uid;
        this.roles = { appUser: true }
    }
}