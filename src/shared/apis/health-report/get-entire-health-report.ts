import { API_ENDPOINTS } from "@/shared/apis/api-endpoints";
import type {
	EntireHealthReportView,
	GetEntireHealthReportParams,
} from "@/shared/apis/health-report/types";
import { HTTP_METHOD, request } from "@/shared/apis/request";

export const getEntireHealthReport = ({
	healthReportId,
}: GetEntireHealthReportParams) => {
	return request<EntireHealthReportView>({
		method: HTTP_METHOD.GET,
		url: API_ENDPOINTS.healthReport.entire(healthReportId),
	});
};
