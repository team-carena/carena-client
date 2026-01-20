import axios, { type AxiosError, type AxiosResponse } from "axios";
import type { BaseResponse } from "./api-types";

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

apiClient.interceptors.response.use(
	(response: AxiosResponse<BaseResponse<unknown>>) => response,
	(error: AxiosError) => Promise.reject(error),
);
