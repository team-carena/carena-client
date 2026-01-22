import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_ENDPOINTS } from "@/shared/apis/api-endpoints";
import type { SuccessResponseVoid } from "@/shared/apis/generated/data-contracts";
import { HTTP_METHOD, request } from "@/shared/apis/request";

export const useLogout = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: postLogout,
		onSuccess: () => {
			// 캐시된 모든 쿼리 데이터 삭제
			queryClient.clear();
		},
	});
};

export const postLogout = () => {
	return request<void>({
		method: HTTP_METHOD.POST,
		url: API_ENDPOINTS.member.logout,
	});
};
