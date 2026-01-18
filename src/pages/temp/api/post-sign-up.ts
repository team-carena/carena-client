import type {
	SignUpRequest,
	SuccessResponseVoid,
} from "@/shared/apis/generated/data-contracts";
import { request } from "@/shared/apis/request";

export const postSignUp = (body: SignUpRequest) => {
	return request<SuccessResponseVoid, SignUpRequest>({
		method: "POST",
		url: "/member/signup",
		body,
		rawResponse: true,
	});
};
