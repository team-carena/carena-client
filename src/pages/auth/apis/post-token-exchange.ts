import type { SuccessResponseVoid } from "@/shared/apis/generated/data-contracts";
import { request } from "@/shared/apis/request";

// oauth-callback에서 사용
export const postTokenExchange = () => {
	return request<SuccessResponseVoid>({
		method: "POST",
		url: "/member/tokens",
		rawResponse: true,
	});
};
