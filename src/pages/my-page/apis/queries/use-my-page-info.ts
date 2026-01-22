import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "@/shared/apis/api-endpoints";
import type { MyPageResponse } from "@/shared/apis/generated/data-contracts";
import { queryKeys } from "@/shared/apis/query-keys";
import { HTTP_METHOD, request } from "@/shared/apis/request";

export const useMyPageInfo = () => {
	return useQuery({
		queryKey: queryKeys.member.myPage(),
		queryFn: getMyPageInfo,
	});
};

export const getMyPageInfo = () => {
	return request<MyPageResponse>({
		method: HTTP_METHOD.GET,
		url: API_ENDPOINTS.member.logout,
	});
};
