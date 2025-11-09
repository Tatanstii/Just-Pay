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

export type Pagination<T> = {
    current_page: number;
    data: T;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url: string | null;
    per_page: number;
    to: number;
    total: number;
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

export type Plan = {
    id: number;
    name: string;
    description: string;
    stripe_price_id: string;
    stripe_product_id: string;
    amount: number;
    currency: string;
    interval: 'month';
}

export type Plans = Plan[];

export type PlansResponse = SuccessResponse<Pagination<Plans>>;

export type Subscription = {
    status: string;
    started_at: string;
    current_period_end: string;
    plan: Plan;
};

export type SubscriptionResponse = SuccessResponse<Subscription>;