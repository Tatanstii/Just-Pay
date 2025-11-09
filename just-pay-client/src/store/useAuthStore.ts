import {  redirect } from '@tanstack/react-router'
import { create } from 'zustand';
import { getUser, logout } from '../services/auth';
import type { GetUserResponse, SuccessResponse, User } from '../type';

type UserStore = {
    user: User | null;
    loading: boolean;
    fetchUser: () => Promise<void>;
    logout: () => void;
};

export const useAuthStore = create<UserStore>((set) => ({
    user: null,
    loading: true,
    fetchUser: async () => {
        try {
            const response = await getUser();
            if (response.status === 'success') {
                const safeResponse = (response as SuccessResponse<GetUserResponse>);
                set({ user: safeResponse.data.user, loading: false });
            }

        } catch {
            set({ user: null, loading: false });
        }
    },
    logout: async () => {
        try {
            const response = await logout();
            if (response.status === 'success') {
                localStorage.removeItem('auth_token');
                redirect({ to: '/login' });
                set({ user: null, loading: false });
            }
        } catch {
            set({ user: null, loading: false });
        }
    },
}));