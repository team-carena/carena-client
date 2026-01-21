import { useQuery } from "@tanstack/react-query";
import { getHealthReportDateList } from "@/shared/apis/health-report/get-health-report-date-list";
import type { GetHealthReportDateListParams } from "@/shared/apis/health-report/types";
import { queryKeys } from "@/shared/apis/query-keys";

export const useHealthReportDateList = ({
	index,
}: GetHealthReportDateListParams) => {
	return useQuery({
		queryKey: queryKeys.healthReport.dateList({ page: index }),
		queryFn: () => getHealthReportDateList({ index }),
	});
};
