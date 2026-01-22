import axios, { type AxiosError } from "axios";
import { useAuthStore } from "../store/auth-store";
import { API_ENDPOINTS } from "./api-endpoints";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
	throw new Error(
		"VITE_API_BASE_URL is not defined. Please check your .env file.",
	);
}

export const apiClient = axios.create({
	baseURL: API_BASE_URL,
	withCredentials: true,
	timeout: 10000,
});

apiClient.interceptors.request.use((config) => {
	const { accessToken } = useAuthStore.getState();

	if (accessToken) {
		config.headers = config.headers ?? {};
		config.headers.Authorization = `Bearer ${accessToken}`;
	}

	return config;
});
apiClient.interceptors.response.use(
	(response) => response,
	(error: AxiosError) => Promise.reject(error),
);

let refreshPromise: Promise<string> | null = null;

apiClient.interceptors.response.use(
	(response) => response,
	async (error: AxiosError) => {
		const originalRequest = error.config;

		const skipAuthRefresh = (
			originalRequest?.headers as Record<string, string | undefined> | undefined
		)?.["x-skip-auth-refresh"];

		if (error.response?.status !== 401 || !originalRequest || skipAuthRefresh) {
			return Promise.reject(error);
		}

		try {
			if (!refreshPromise) {
				refreshPromise = (async () => {
					const response = await apiClient.post(
						API_ENDPOINTS.member.tokenRefresh,
						undefined,
						{
							headers: {
								"x-skip-auth-refresh": "true", // 무한 루프 방지
							},
						},
					);

					const authorization = response.headers.authorization;
					if (!authorization) {
						throw new Error("Authorization header missing");
					}

					return authorization.replace(/^Bearer\s+/i, "");
				})();
			}

			const newAccessToken = await refreshPromise;

			const store = useAuthStore.getState();
			store.setAccessToken(newAccessToken);
			store.setAuthenticated(true);

			originalRequest.headers = originalRequest.headers ?? {};
			originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

			return apiClient(originalRequest);
		} catch (refreshError) {
			const store = useAuthStore.getState();
			store.setAccessToken(null);
			store.setAuthenticated(false);

			return Promise.reject(refreshError);
		} finally {
			refreshPromise = null;
		}
	},
);
