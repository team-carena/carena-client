export const healthReportQueryKeys = {
	all: ["health-report"] as const,
	dateList: (index: number) =>
		[...healthReportQueryKeys.all, "dates", index] as const,
	detail: (healthReportId: string) =>
		[...healthReportQueryKeys.all, "detail", healthReportId] as const,
};
