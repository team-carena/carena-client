import { RESPONSE_MESSAGE } from "@shared/constants/response";
import { isAxiosError } from "axios";
import { apiClient } from "./api-client";
import type { BaseResponse, QueryParams, RequestBody } from "./api-types";

export const HTTP_METHOD = {
	GET: "GET",
	POST: "POST",
	PUT: "PUT",
	DELETE: "DELETE",
	PATCH: "PATCH",
} as const;

export type HttpMethod = (typeof HTTP_METHOD)[keyof typeof HTTP_METHOD];

export interface RequestConfig {
	method: HttpMethod;
	url: string;
	query?: QueryParams;
	body?: RequestBody;
	headers?: Record<string, string>;
}

export const request = async <T>(config: RequestConfig): Promise<T> => {
	const { method, url, query, body, headers } = config;

	try {
		const response = await apiClient.request<BaseResponse<T>>({
			method,
			url,
			params: query,
			data: body,
			headers,
		});

		if (import.meta.env.DEV) {
			// biome-ignore lint/suspicious/noConsole: 개발 단계 디버깅
			console.debug(`[성공] ${url}: ${response.data.message}`);
		}

		return response.data.data;
	} catch (error: unknown) {
		if (!isAxiosError(error)) {
			if (import.meta.env.DEV) {
				// biome-ignore lint/suspicious/noConsole: 개발 단계 디버깅
				console.error(`[실패] ${url}: 네트워크 오류`);
			}
			throw error;
		}

		const status = error.response?.status;
		const message =
			error.response?.data?.message ??
			(status ? RESPONSE_MESSAGE[status] : undefined) ??
			"알 수 없는 오류가 발생했습니다.";

		if (import.meta.env.DEV) {
			// biome-ignore lint/suspicious/noConsole: 개발 단계 디버깅
			console.error(`[실패] ${url}: ${message}`);
		}

		throw error;
	}
};
