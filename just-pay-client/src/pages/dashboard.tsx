import { getSubscription } from "@/services/subscription";
import { useAuthStore } from "@/store/useAuthStore";
import { useQuery } from "@tanstack/react-query";

export default function DashboardPage() {
    const { user } = useAuthStore.getState();
    const { data, isLoading, error } = useQuery({
        queryKey: ['dashboardData'],
        queryFn: () => getSubscription(),
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    console.log(data);

    return (
        <main className="px-10">
            <h1 className="my-4 text-2xl text-primary">Welcome back, <span className="font-bold">{user?.name}</span>!</h1>
            <div>
                <p>Current plan</p>
                <div className="bg-primary/20 p-4 rounded-md w-max mt-4">
                    {data?.data.plan.name} - {data?.data.plan.amount / 100} {data?.data.plan.currency} / {data?.data.plan.interval}
                </div>
            </div>
        </main>
    )
}