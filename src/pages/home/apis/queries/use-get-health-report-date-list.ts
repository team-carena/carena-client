import { useQuery } from "@tanstack/react-query";
import { getHealthReportDateList } from "@/pages/home/apis/mutations/get-health-report-date-list";
import { queryKeys } from "@/shared/apis/query-keys";
import type { GetHealthReportDateListParams } from "@/shared/configs/health-report/types";

export const useHealthReportDateList = ({
	index,
}: GetHealthReportDateListParams) => {
	return useQuery({
		queryKey: queryKeys.healthReport.dateList({ page: index }),
		queryFn: () => getHealthReportDateList({ index }),
	});
};
