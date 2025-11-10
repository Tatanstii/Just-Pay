import Plans from "@/components/plans";
import { getSubscription } from "@/services/subscription";
import { useToast } from "@/store/useToastStore";
import type { SubscriptionResponse } from "@/type";
import { useQuery } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";
import { Suspense } from "react";

export default function UserPanelPage() {
    const search = useSearch({ strict: false });
    const toast = useToast();
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

    if ('planUpdated' in search && search.planUpdated == 'true') {
        toast.show('Plan updated successfully!', 'success');
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
