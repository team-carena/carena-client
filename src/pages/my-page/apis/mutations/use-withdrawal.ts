import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { ROUTE_PATH } from "@/app/routes/paths";
import { API_ENDPOINTS } from "@/shared/apis/api-endpoints";
import { HTTP_METHOD, request } from "@/shared/apis/request";
import { useAuthStore } from "@/shared/store/auth-store";
import { notify, notifyError } from "@/shared/ui/overlays/toast/toast";

export const useWithdrawal = () => {
	const navigate = useNavigate();
	const logoutStore = useAuthStore((state) => state.logout);
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: postWithdrawal,
		onSuccess: () => {
			queryClient.clear();
			logoutStore();
			void navigate(ROUTE_PATH.LOGIN, { replace: true });
			notify("탈퇴되었습니다");
		},
		onError: () => {
			notifyError("회원탈퇴에 실패했습니다");
		},
	});
};

const postWithdrawal = () => {
	return request<void>({
		method: HTTP_METHOD.POST,
		url: API_ENDPOINTS.member.withdrawal,
	});
};
