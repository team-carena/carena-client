import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "@/shared/apis/api-endpoints";
import type { MemberInfoResponse } from "@/shared/apis/generated/data-contracts";
import { queryKeys } from "@/shared/apis/query-keys";
import { HTTP_METHOD, request } from "@/shared/apis/request";

export const useMyInfo = () => {
	return useQuery({
		queryKey: queryKeys.member.info(),
		queryFn: getMyInfo,
	});
};

export const getMyInfo = () => {
	return request<MemberInfoResponse>({
		method: HTTP_METHOD.GET,
		url: API_ENDPOINTS.member.myInfo,
	});
};
