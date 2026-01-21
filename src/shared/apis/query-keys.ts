export const healthReportQueryKeys = {
	all: ["health-report"] as const,
	dateList: (index: number) =>
		[...healthReportQueryKeys.all, "dates", index] as const,
};
