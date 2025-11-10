import { getPlans } from '@/services/plans'
import { useQuery } from '@tanstack/react-query'
import type { CheckoutSessionResponse, PlansResponse } from '@/type'
import PlanCard from '../plan-card'
import { cancelSubscription, createCheckoutSession } from '@/services/subscription'
import { VITE_CANCEL_CHECKOUT_URL, VITE_SUCCESS_CHECKOUT_URL } from '@/lib/const'
import { useToast } from '@/store/useToastStore'
import { AxiosError } from 'axios'

type PropTypes = {
    currentPlanId?: number;
}

export default function Plans(props: PropTypes) {
    const toast = useToast();
    const { data, isPending, error } = useQuery<PlansResponse | Error>({
        queryKey: ['plans'],
        queryFn: () => getPlans()
    })

    const plans = data && !(data instanceof Error) ? data.data.data : []

    if (isPending) {
        return <h1>Loading...</h1>
    }

    if (error) {
        return <h1>Error loading plans</h1>
    }

    const handleStartCheckout = async (planId: number) => {
        try {
            const response = await createCheckoutSession(planId, VITE_SUCCESS_CHECKOUT_URL, VITE_CANCEL_CHECKOUT_URL);
            const safeResponse = (response as CheckoutSessionResponse);

            window.open(safeResponse.data.checkout_url, '_blank');

        } catch (error) {
            if (error instanceof AxiosError) {
                toast.show(error.message, "error", [error.response?.data?.message || ""]);
                return;
            }
            toast.show("An unexpected error occurred.", "error");
        }
    };


    const handleCancelSubscription = async () => {
        try {
            await cancelSubscription();
            toast.show("Subscription cancelled successfully.", "success");
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.show(error.message, "error", [error.response?.data?.message || ""]);
                return;
            }
            toast.show("An unexpected error occurred.", "error");
        }
    };

    return (
        <div className='flex flex-row flex-wrap gap-4'>
            {
                plans.map((plan) => (
                    <div key={plan.id} className='min-w-1/4'>
                        <PlanCard {...plan} currentPlanId={props.currentPlanId} onStartCheckout={handleStartCheckout} onCancelSubscription={handleCancelSubscription} />
                    </div>
                ))
            }
        </div>
    )
}
