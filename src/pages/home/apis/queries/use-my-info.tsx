import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "@/shared/apis/api-endpoints";
import type { MemberInfoResponse } from "@/shared/apis/generated/data-contracts";
import { queryKeys } from "@/shared/apis/query-keys";
import { HTTP_METHOD, request } from "@/shared/apis/request";

export const useMemberInfo = () => {
	return useQuery({
		queryKey: queryKeys.member.info(),
		queryFn: () => getMemberInfo,
	});
};

export const getMemberInfo = () => {
	return request<MemberInfoResponse>({
		method: HTTP_METHOD.GET,
		url: API_ENDPOINTS.member.myInfo,
	});
};
