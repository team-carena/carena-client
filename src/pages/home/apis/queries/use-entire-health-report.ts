import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "@/shared/apis/api-endpoints";
import { queryKeys } from "@/shared/apis/query-keys";
import { HTTP_METHOD, request } from "@/shared/apis/request";
import type {
	EntireHealthReportView,
	GetEntireHealthReportParams,
} from "@/shared/configs/health-report/health-report.types";

type UseEntireHealthReportParams = GetEntireHealthReportParams & {
	enabled?: boolean;
};

export const useEntireHealthReport = ({
	healthReportId,
	enabled = true,
}: UseEntireHealthReportParams) => {
	return useQuery({
		queryKey: queryKeys.healthReport.entire(healthReportId),
		queryFn: () => getEntireHealthReport({ healthReportId }),
		enabled,
	});
};

export const getEntireHealthReport = ({
	healthReportId,
}: GetEntireHealthReportParams) => {
	return request<EntireHealthReportView>({
		method: HTTP_METHOD.GET,
		url: API_ENDPOINTS.healthReport.entire(healthReportId),
	});
};
