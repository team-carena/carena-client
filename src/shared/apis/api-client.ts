import axios, { type AxiosError } from "axios";

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
	(response) => response,
	(error: AxiosError) => Promise.reject(error),
);
