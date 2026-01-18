import type { SuccessResponseVoid } from "../generated/data-contracts";
import { request } from "../request";

export const postRefreshToken = () => {
	return request<SuccessResponseVoid>({
		method: "POST",
		url: "/member/token/refresh",
		rawResponse: true,
	});
};
