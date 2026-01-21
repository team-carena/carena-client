import { useSuspenseQuery } from "@tanstack/react-query";
import { getHealthReportDateList } from "@/shared/apis/health-report/get-health-report-date-list";
import type { GetHealthReportDateListParams } from "@/shared/apis/health-report/types";
import { healthReportQueryKeys } from "@/shared/apis/query-keys";

export const useHealthReportDateList = ({
	index,
}: GetHealthReportDateListParams) => {
	return useSuspenseQuery({
		queryKey: healthReportQueryKeys.dateList(index),
		queryFn: () => getHealthReportDateList({ index }),
	});
};
