import type { SuccessResponseVoid } from "../generated/data-contracts";
import { request } from "../request";

export const postLogout = () => {
	return request<SuccessResponseVoid>({
		method: "POST",
		url: "/member/logout",
	});
};
