import { useMutation } from "@tanstack/react-query";
import { API_ENDPOINTS } from "@/shared/apis/api-endpoints";
import type { SuccessResponseVoid } from "@/shared/apis/generated/data-contracts";
import { HTTP_METHOD, request } from "@/shared/apis/request";

export const useLogout = () => {
	return useMutation({
		mutationFn: postLogout,
	});
};

export const postLogout = () => {
	return request<SuccessResponseVoid>({
		method: HTTP_METHOD.POST,
		url: API_ENDPOINTS.member.logout,
	});
};
