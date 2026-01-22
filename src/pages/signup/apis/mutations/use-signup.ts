import { useMutation } from "@tanstack/react-query";
import { API_ENDPOINTS } from "@/shared/apis/api-endpoints";
import type {
	SignUpRequest,
	SuccessResponseVoid,
} from "@/shared/apis/generated/data-contracts";
import { HTTP_METHOD, request } from "@/shared/apis/request";

export const useSignUp = () => {
	return useMutation({
		mutationFn: postSignUp,
	});
};

export const postSignUp = (body: SignUpRequest) => {
	return request<SuccessResponseVoid, SignUpRequest>({
		method: HTTP_METHOD.POST,
		url: API_ENDPOINTS.member.signup,
		body,
		rawResponse: true,
	});
};
