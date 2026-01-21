import { useQuery } from "@tanstack/react-query";
import { getEntireHealthReport } from "@/pages/home/apis/mutations/get-entire-health-report";
import { queryKeys } from "@/shared/apis/query-keys";
import type { GetEntireHealthReportParams } from "@/shared/configs/health-report/types";

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
