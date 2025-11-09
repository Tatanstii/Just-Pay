import Plans from "@/components/plans";
import { getSubscription } from "@/services/subscription";
import type { SubscriptionResponse } from "@/type";
import { useQuery } from "@tanstack/react-query";
import { Suspense } from "react";

export default function UserPanelPage() {
    const { data, isLoading, error } = useQuery<SubscriptionResponse | Error>({
        queryKey: ['dashboardData'],
        queryFn: () => getSubscription(),
    });

    const subscription = data instanceof Error ? null : data;

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <main>
            <div className="px-10">
                <h1 className="my-4 text-2xl text-primary">Plans recommended for you</h1>
                <Suspense fallback={<h1>Loading plans...</h1>}>
                    <Plans currentPlanId={subscription?.data?.plan.id} />
                </Suspense>
            </div>
        </main>
    )
}
