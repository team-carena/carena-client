import { useMutation, useQueryClient } from "@tanstack/react-query";
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

interface UpdateHealthReportParams {
	healthReportId: string;
	data: WriteHealthReportRequest;
}

export const useHealthReportUpdateMutation = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ healthReportId, data }: UpdateHealthReportParams) =>
			putHealthReport(healthReportId, data),
		throwOnError: false,
		onSuccess: async (_data, variables) => {
			await Promise.all([
				queryClient.invalidateQueries({
					queryKey: queryKeys.member.info(),
				}),
				queryClient.invalidateQueries({
					queryKey: queryKeys.healthReport.all,
				}),
				queryClient.invalidateQueries({
					queryKey: queryKeys.recommendedMeal.all,
				}),
			]);
			notifySuccess("검진 결과가 수정되었습니다");
			void navigate(
				`${ROUTE_PATH.HEALTH_ANALYSIS}?reportId=${variables.healthReportId}`,
				{ replace: true },
			);
		},
		onError: () => {
			notifyError("검진 결과 수정에 실패했어요");
		},
	});
};

const putHealthReport = (
	healthReportId: string,
	data: WriteHealthReportRequest,
) => {
	return request<SuccessResponseVoid>({
		method: HTTP_METHOD.PUT,
		url: API_ENDPOINTS.healthReport.update(healthReportId),
		body: data,
	});
};
