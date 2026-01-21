import { useQuery } from "@tanstack/react-query";

import { HTTP_METHOD, request } from "@/shared/apis/request";

export interface HealthReportHistoryItem {
	value: number;
	healthCheckDate: string; // "YYYY-MM-DD"
}

export interface HealthReportHistoryData {
	history: HealthReportHistoryItem[];
}

interface GetHealthReportHistoryRequest {
	endpoint: string;
	healthCheckDate: string;
}

type QueryKeyInput =
	| readonly unknown[]
	| ((healthCheckDate: string) => readonly unknown[]);

interface UseGetHealthReportHistoryProps extends GetHealthReportHistoryRequest {
	queryKey: QueryKeyInput;
}

const buildQueryKey = (queryKey: QueryKeyInput, healthCheckDate: string) => {
	if (typeof queryKey === "function") {
		return queryKey(healthCheckDate);
	}

	// queryKey가 날짜를 포함하지 않아도 캐시가 섞이지 않도록 보정
	return [...queryKey, healthCheckDate] as const;
};

// 검진결과 상세 - 항목별 히스토리 조회 API
export const getHealthReportHistory = ({
	endpoint,
	healthCheckDate,
}: GetHealthReportHistoryRequest) => {
	return request<HealthReportHistoryData>({
		method: HTTP_METHOD.GET,
		url: endpoint,
		query: {
			healthCheckDate: healthCheckDate,
		},
	});
};

// 검진결과 상세 - 항목별 히스토리 조회 Query
export const useGetHealthReportHistory = ({
	endpoint,
	healthCheckDate,
	queryKey,
}: UseGetHealthReportHistoryProps) => {
	return useQuery({
		queryKey: buildQueryKey(queryKey, healthCheckDate),
		queryFn: () => getHealthReportHistory({ endpoint, healthCheckDate }),
		enabled: !!endpoint && !!healthCheckDate,
	});
};
