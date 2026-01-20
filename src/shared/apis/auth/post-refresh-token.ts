import type { SuccessResponseVoid } from "../generated/data-contracts";
import { request } from "../request";

export const postRefreshAccessToken = () => {
	return request<SuccessResponseVoid>({
		method: "POST",
		url: "/member/token/refresh",
		rawResponse: true,
	});
};
