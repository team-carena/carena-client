import axios, { type AxiosError, type AxiosResponse } from "axios";
import type { BaseResponse } from "./api-types";

export const apiClient = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true,
	timeout: 10000,
});

apiClient.interceptors.response.use(
	(response: AxiosResponse<BaseResponse<unknown>>) => response,
	(error: AxiosError<BaseResponse<unknown>>) => {
		if (import.meta.env.DEV) {
			const status = error.response?.status ?? "알 수 없음";
			const method = error.config?.method ?? "unknown";
			const url = error.config?.url ?? "unknown";
			// biome-ignore lint/suspicious/noConsole: 개발 단계 디버깅
			console.error(`[API] ${method} ${url} -> ${status}`);
		}

		return Promise.reject(error);
	},
);
