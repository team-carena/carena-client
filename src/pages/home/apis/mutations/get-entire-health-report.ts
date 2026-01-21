import { API_ENDPOINTS } from "@/shared/apis/api-endpoints";
import { HTTP_METHOD, request } from "@/shared/apis/request";
import type {
	EntireHealthReportView,
	GetEntireHealthReportParams,
} from "@/shared/configs/health-report/types";

export const getEntireHealthReport = ({
	healthReportId,
}: GetEntireHealthReportParams) => {
	return request<EntireHealthReportView>({
		method: HTTP_METHOD.GET,
		url: API_ENDPOINTS.healthReport.entire(healthReportId),
	});
};
