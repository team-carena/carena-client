import axios, { type AxiosError } from "axios";
import { refreshAccessToken } from "@/app/api/refresh-access-token";
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

let refreshPromise: Promise<string> | null = null;

apiClient.interceptors.response.use(
	(response) => response,
	async (error: AxiosError) => {
		const originalRequest = error.config;

		// 401 아니면 그냥 에러 반환
		if (
			error.response?.status !== 401 ||
			!originalRequest ||
			(originalRequest.headers as any)?.["x-skip-auth-refresh"]
		) {
			return Promise.reject(error);
		}

		try {
			// 이미 refresh 중이면 그 Promise 재사용
			if (!refreshPromise) {
				refreshPromise = refreshAccessToken();
			}

			const newAccessToken = await refreshPromise;
			refreshPromise = null;

			const store = useAuthStore.getState();
			store.setAccessToken(newAccessToken);
			store.setAuthenticated(true);

			// 원래 요청에 새 토큰 붙여서 재시도
			originalRequest.headers = originalRequest.headers ?? {};
			originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

			return apiClient(originalRequest);
		} catch (refreshError) {
			refreshPromise = null;

			// refresh 실패 -> 로그아웃 처리
			const store = useAuthStore.getState();
			store.setAccessToken("");
			store.setAuthenticated(false);

			return Promise.reject(refreshError);
		}
	},
);
