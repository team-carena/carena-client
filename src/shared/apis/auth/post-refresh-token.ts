import { useMutation } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../api-endpoints";
import type { SuccessResponseVoid } from "../generated/data-contracts";
import { HTTP_METHOD, request } from "../request";

export const useRefreshAccessToken = () => {
	return useMutation({
		mutationFn: postRefreshAccessToken,
	});
};

// auth-initializer에서 사용
export const postRefreshAccessToken = () => {
	return request<SuccessResponseVoid>({
		method: HTTP_METHOD.POST,
		url: API_ENDPOINTS.member.tokenRefresh,
		rawResponse: true,
	});
};
