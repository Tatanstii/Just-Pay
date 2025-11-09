export type Response = {
    status: 'success' | 'error';
    message: string;
}

export type SuccessResponse<T> = Response & {
    data: T;
}

export type Errors = Record<string, string[]> | [];

export type ErrorResponse = Response & {
    errors: Errors;
}

export type RegisterResponse = {
    access_token: string;
}

export type LoginResponse = {
    access_token: string;
}

export type GetUserResponse = {
    user: User;
}

export type User = {
    id: number;
    name: string;
    email: string;

}