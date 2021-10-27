
export interface LoginResult {
    status: boolean;
    massage: string;
    token?: string;
}

export interface LoginData {
    email: string;
    password: string;
}
