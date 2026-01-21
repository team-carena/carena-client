import { API_ENDPOINTS } from "@/shared/apis/api-endpoints";
import { HTTP_METHOD, request } from "@/shared/apis/request";
import type {
	GetHealthReportDateListParams,
	HealthReportDateListView,
} from "@/shared/configs/health-report/types";

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
