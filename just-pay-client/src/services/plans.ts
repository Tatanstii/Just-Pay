import { request } from "@/lib/axios";
import type { PlansResponse } from "@/type";

export const getPlans = async (): Promise<PlansResponse | Error> => {
    const response = await request.get('/api/plans');
    if (response.status !== 200) {
        throw new Error(response.data.message);
    }
    return response.data;
}