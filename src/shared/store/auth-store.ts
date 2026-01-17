import { create } from "zustand";

interface AuthState {
	isAuthenticated: boolean;
	isAuthCheckLoading: boolean;
	accessToken: string | null;
	setAccessToken: (token: string | null) => void;
	setAuthenticated: (value: boolean) => void;
	setAuthCheckLoading: (value: boolean) => void;
	logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
	isAuthenticated: false,
	isAuthCheckLoading: true,
	accessToken: null,

	setAccessToken: (token) => set({ accessToken: token }),
	setAuthenticated: (value) => set({ isAuthenticated: value }),
	setAuthCheckLoading: (value) => set({ isAuthCheckLoading: value }),

	logout: () =>
		set({
			isAuthenticated: false,
			accessToken: null,
			isAuthCheckLoading: false,
		}),
}));
