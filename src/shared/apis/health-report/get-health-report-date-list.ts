import { API_ENDPOINTS } from "@/shared/apis/api-endpoints";
import type {
	GetHealthReportDateListParams,
	HealthReportDateListView,
} from "@/shared/apis/health-report/types";
import { HTTP_METHOD, request } from "@/shared/apis/request";

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
