import { API_ENDPOINTS } from "@/shared/apis/api-endpoints";
import type { HealthReportDateListView } from "@/shared/apis/health-report/types";
import { HTTP_METHOD, request } from "@/shared/apis/request";

export const getHealthReportDateList = (index: number) => {
	return request<HealthReportDateListView>({
		method: HTTP_METHOD.GET,
		url: API_ENDPOINTS.HEALTH_REPORT.DATE_LIST,
		query: {
			index,
		},
	});
};
