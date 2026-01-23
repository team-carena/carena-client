import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { ROUTE_PATH } from "@/app/routes/paths";
import { API_ENDPOINTS } from "@/shared/apis/api-endpoints";
import type {
	CreateHealthReportRequest,
	SuccessResponseVoid,
} from "@/shared/apis/generated/data-contracts";
import { HTTP_METHOD, request } from "@/shared/apis/request";
import { notifyError, notifySuccess } from "@/shared/ui/overlays/toast/toast";

export const useHealthReportMutation = () => {
	const navigate = useNavigate();

	return useMutation({
		mutationFn: (data: CreateHealthReportRequest) => postHealthReport(data),
		throwOnError: false,
		onSuccess: () => {
			notifySuccess("검진 결과가 추가되었습니다");
			void navigate(ROUTE_PATH.HOME, { replace: true });
		},
		onError: (error) => {
			if (error instanceof AxiosError) {
				if (error.response?.status === 409) {
					notifyError("해당 검진일자에 결과가 이미 등록되어있습니다");
					return;
				}
			}
			notifyError("검진 결과 저장에 실패했어요");
		},
	});
};

const postHealthReport = (data: CreateHealthReportRequest) => {
	return request<SuccessResponseVoid>({
		method: HTTP_METHOD.POST,
		url: API_ENDPOINTS.healthReport.create,
		body: data,
	});
};
