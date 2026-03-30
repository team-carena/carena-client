import { trackCheckupSubmit } from "@shared/libs/analytics";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { ROUTE_PATH } from "@/app/routes/paths";
import { API_ENDPOINTS } from "@/shared/apis/api-endpoints";
import type {
	SuccessResponseVoid,
	WriteHealthReportRequest,
} from "@/shared/apis/generated/data-contracts";
import { queryKeys } from "@/shared/apis/query-keys";
import { HTTP_METHOD, request } from "@/shared/apis/request";
import { notifyError, notifySuccess } from "@/shared/ui/overlays/toast/toast";

export const useHealthReportMutation = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: WriteHealthReportRequest) => postHealthReport(data),
		throwOnError: false,
		onSuccess: () => {
			trackCheckupSubmit();
			void queryClient.invalidateQueries({
				queryKey: queryKeys.member.info(),
			});
			void queryClient.invalidateQueries({
				queryKey: queryKeys.healthReport.all,
			});
			// 검진결과생성 시 추천식단도 invalidate
			void queryClient.invalidateQueries({
				queryKey: queryKeys.recommendedMeal.all,
			});
			notifySuccess("검진 결과가 추가되었습니다");
			// 검진결과생성 시 /home으로 이동할 때 polling=true 전달 -> 건강식단 API 활성화
			void navigate(`${ROUTE_PATH.HOME}?polling=true`, { replace: true });
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

const postHealthReport = (data: WriteHealthReportRequest) => {
	return request<SuccessResponseVoid>({
		method: HTTP_METHOD.POST,
		url: API_ENDPOINTS.healthReport.create,
		body: data,
	});
};
