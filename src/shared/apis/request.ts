import { RESPONSE_MESSAGE } from "@shared/constants/response";
import { type AxiosResponse, isAxiosError } from "axios";
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

export interface RequestConfig<TBody = RequestBody> {
	method: HttpMethod;
	url: string;
	query?: QueryParams;
	body?: TBody;
	headers?: Record<string, string>;
	rawResponse?: boolean;
}
// 함수 오버로드

// rawResponse = true -> AxiosResponse 반환
export async function request<T, TBody = RequestBody>(
	config: RequestConfig<TBody> & { rawResponse: true },
): Promise<AxiosResponse<BaseResponse<T>>>;

// 기본 -> data만 반환
export async function request<T>(config: RequestConfig): Promise<T>;

export async function request<T, TBody = RequestBody>(
	config: RequestConfig<TBody>,
): Promise<T | AxiosResponse<BaseResponse<T>>> {
	const { method, url, query, body, headers, rawResponse } = config;

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

		// 헤더까지 필요한 경우
		if (rawResponse) {
			return response;
		}

		// 기본 동작
		return response.data.data;
	} catch (error: unknown) {
		if (!isAxiosError(error)) {
			if (import.meta.env.DEV) {
				// biome-ignore lint/suspicious/noConsole: 개발 단계 디버깅
				console.error(`[실패] ${url}: 예상치 못한 오류`);
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
}
