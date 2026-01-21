import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "@/shared/apis/api-endpoints";
import { queryKeys } from "@/shared/apis/query-keys";
import { HTTP_METHOD, request } from "@/shared/apis/request";
import type {
	GetHealthReportDateListParams,
	HealthReportDateListView,
} from "@/shared/configs/health-report/types";

export const useHealthReportDateList = ({
	index,
}: GetHealthReportDateListParams) => {
	return useQuery({
		queryKey: queryKeys.healthReport.dateList({ page: index }),
		queryFn: () => getHealthReportDateList({ index }),
	});
};

export const getHealthReportDateList = ({
	index,
}: GetHealthReportDateListParams) => {
	return request<HealthReportDateListView>({
		method: HTTP_METHOD.GET,
		url: API_ENDPOINTS.healthReport.dates,
		query: {
			index,
		},
	});
};
