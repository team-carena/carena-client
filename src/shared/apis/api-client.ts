import axios, { type AxiosError } from "axios";
import { useAuthStore } from "../store/auth-store";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
	throw new Error(
		"VITE_API_BASE_URL is not defined. Please check your .env file.",
	);
}

export const apiClient = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true,
	timeout: 10000,
});

apiClient.interceptors.request.use(
	(config) => {
		const { accessToken } = useAuthStore.getState();

		if (accessToken) {
			config.headers = config.headers ?? {};
			config.headers.Authorization = `Bearer ${accessToken}`;
		}

		return config;
	},
	(error: AxiosError) => Promise.reject(error),
);

apiClient.interceptors.response.use(
	(response) => response,
	async (error: AxiosError) => {
		if (error.response?.status !== 401) {
			return Promise.reject(error);
		}

		// 1. refresh 시도
		// const success = await refresh();

		// if (success) {
		//   2. accessToken 갱신
		//  3. 원래 요청 재시도
		// }

		// 4. refresh 실패
		// logout()
		// isAuthenticated = false

		return Promise.reject(error);
	},
);
