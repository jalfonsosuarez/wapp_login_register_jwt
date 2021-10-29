import { User } from '../users/user.interface';

export interface RegisterResult {
    status: boolean;
    massage: string;
    user?: User;
}

export interface RegisterData {
    name: string;
    lastName: string;
    email: string;
    password: string;
}
