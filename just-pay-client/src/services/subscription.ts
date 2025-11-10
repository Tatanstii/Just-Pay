import { request } from "@/lib/axios";
import type { CheckoutSessionResponse, SubscriptionResponse } from "@/type";

export const getSubscription = async (): Promise<SubscriptionResponse | Error> => {
    const response = await request.get('/api/subscriptions/current');
    if (response.status !== 200) {
        throw new Error(response.data.message);
    }
    return response.data;
}

export const createCheckoutSession = async (planId: number, successUrl: string, cancelUrl: string): Promise<CheckoutSessionResponse | Error> => {
    const response = await request.post(`/api/subscriptions/checkout/${planId}`, {
        success_url: successUrl,
        cancel_url: cancelUrl
    });
    if (response.status !== 200) {
        throw new Error(response.data.message);
    }
    return response.data;
}

export const cancelSubscription = async (): Promise<void | Error> => {
    const response = await request.post(`/api/subscriptions/cancel`);
    if (response.status !== 200) {
        throw new Error(response.data.message);
    }
    return response.data;
}