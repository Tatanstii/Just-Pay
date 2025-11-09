import { create } from "zustand";

type ToastStore = {
    visible: boolean;
    type?: 'success' | 'error' | 'info';
    message?: string;
    moreInfo?: string[];
    show: (message: string, type?: 'success' | 'error' | 'info', moreInfo?: string[]) => void;
    hide: () => void;
}

export const useToast = create<ToastStore>((set) => ({
    visible: false,
    message: '',
    type: 'info',
    show: (message, type, moreInfo) => {
        set({ visible: true, message, type, moreInfo });
        setTimeout(() => {
            set({ visible: false, message: '', type: 'info', moreInfo: [] });
        }, 10000);
    },
    hide: () => set({ visible: false, message: '', type: 'info', moreInfo: [] }),
}));
