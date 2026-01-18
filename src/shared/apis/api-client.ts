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

let refreshPromise: Promise<string> | null = null;

apiClient.interceptors.response.use(
	(response) => response,
	async (error: AxiosError) => {
		const originalRequest = error.config;

		if (
			error.response?.status !== 401 ||
			!originalRequest ||
			(originalRequest.headers as any)?.["x-skip-auth-refresh"]
		) {
			return Promise.reject(error);
		}

		try {
			if (!refreshPromise) {
				refreshPromise = (async () => {
					const response = await apiClient.post(
						"/member/token/refresh",
						undefined,
						{
							headers: {
								"x-skip-auth-refresh": "true", // 무한 루프 방지
							},
						},
					);

					const authorization = response.headers["authorization"];
					if (!authorization) {
						throw new Error("Authorization header missing");
					}

					return authorization.replace(/^Bearer\s+/i, "");
				})();
			}

			const newAccessToken = await refreshPromise;
			refreshPromise = null;

			const store = useAuthStore.getState();
			store.setAccessToken(newAccessToken);
			store.setAuthenticated(true);

			originalRequest.headers = originalRequest.headers ?? {};
			originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

			return apiClient(originalRequest);
		} catch (refreshError) {
			refreshPromise = null;

			const store = useAuthStore.getState();
			store.setAccessToken("");
			store.setAuthenticated(false);

			return Promise.reject(refreshError);
		}
	},
);
