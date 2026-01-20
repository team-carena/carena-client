import type { MyPageResponse } from "../generated/data-contracts";
import { request } from "../request";

export const getMyPageInfo = () => {
	return request<MyPageResponse>({
		method: "GET",
		url: "/member/my-page",
	});
};
