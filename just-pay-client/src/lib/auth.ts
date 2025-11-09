import { useAuthStore } from "../store/useAuthStore";
import { redirect } from "@tanstack/react-router";

export const redirectIfAuthenticated = async (): Promise<ReturnType<typeof redirect> | void> => {
    const { loading, fetchUser } = useAuthStore.getState();

    if (loading) {
        await fetchUser();
    }

    const { user } = useAuthStore.getState();

    if (user) {
        return redirect({
            to: '/dashboard'
        });
    }
};

export const redirectIfNotAuthenticated = async () => {
    const { loading, fetchUser } = useAuthStore.getState();
    if (loading) {
        await fetchUser();
    }

    const { user } = useAuthStore.getState();
    if (!user) {
        return redirect({
            to: '/login'
        });
    }
};
