import { API_ENDPOINTS } from "@/shared/apis/api-endpoints";
import type { SuccessResponseVoid } from "@/shared/apis/generated/data-contracts";
import { HTTP_METHOD, request } from "@/shared/apis/request";

// oauth-callback에서 사용
export const postTokenExchange = () => {
	return request<SuccessResponseVoid>({
		method: HTTP_METHOD.POST,
		url: API_ENDPOINTS.member.tokens,
		rawResponse: true,
	});
};
