import { request } from "@/lib/axios";
import type { SubscriptionResponse } from "@/type";

export const getSubscription = async (): Promise<SubscriptionResponse | Error> => {
    const response = await request.get('/api/subscriptions/current');
    if (response.status !== 200) {
        throw new Error(response.data.message);
    }
    return response.data;
}