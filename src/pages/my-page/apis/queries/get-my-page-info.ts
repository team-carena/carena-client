import { API_ENDPOINTS } from "@/shared/apis/api-endpoints";
import type { MyPageResponse } from "@/shared/apis/generated/data-contracts";
import { HTTP_METHOD, request } from "@/shared/apis/request";

export const getMyPageInfo = () => {
	return request<MyPageResponse>({
		method: HTTP_METHOD.GET,
		url: API_ENDPOINTS.member.logout,
	});
};
