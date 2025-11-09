import CurrentPlan from "@/components/current-plan";
import { getSubscription } from "@/services/subscription";
import { useAuthStore } from "@/store/useAuthStore";
import type { SubscriptionResponse } from "@/type";
import { useQuery } from "@tanstack/react-query";

export default function DashboardPage() {
    const { user } = useAuthStore.getState();
    const { data, isLoading, error } = useQuery<SubscriptionResponse | Error>({
        queryKey: ['dashboardData'],
        queryFn: () => getSubscription(),
    });

    const plan = data instanceof Error ? null : data?.data?.plan;

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <main className="px-10">
            <h1 className="my-4 text-2xl text-primary">Welcome back, <span className="font-bold">{user?.name}</span>!</h1>
            {
                plan && (
                    <div className="space-y-4">
                        <p>Current plan</p>
                        <CurrentPlan {...plan} />
                    </div>
                )
            }
        </main>
    )
}