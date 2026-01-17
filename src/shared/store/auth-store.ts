import { create } from "zustand";

interface AuthState {
	isAuthenticated: boolean;
	accessToken: string | null;
	setAccessToken: (token: string | null) => void;
	setAuthenticated: (value: boolean) => void;
	logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
	isAuthenticated: false,
	accessToken: null,

	setAccessToken: (token) => set({ accessToken: token }),
	setAuthenticated: (value) => set({ isAuthenticated: value }),

	logout: () =>
		set({
			isAuthenticated: false,
			accessToken: null,
		}),
}));
