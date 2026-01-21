import { useQuery } from "@tanstack/react-query";
import { getEntireHealthReport } from "@/shared/apis/health-report/get-entire-health-report";
import type { GetEntireHealthReportParams } from "@/shared/apis/health-report/types";
import { queryKeys } from "@/shared/apis/query-keys";

type UseGetEntireHealthReportParams = GetEntireHealthReportParams & {
	enabled?: boolean;
};

export const useGetEntireHealthReport = ({
	healthReportId,
	enabled = true,
}: UseGetEntireHealthReportParams) => {
	return useQuery({
		queryKey: queryKeys.healthReport.entire(healthReportId),
		queryFn: () => getEntireHealthReport({ healthReportId }),
		enabled,
	});
};
