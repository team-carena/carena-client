export const API_ENDPOINTS = {
	HEALTH_REPORT: {
		DATE_LIST: "/api/v1/health-report/dates",
		DETAIL: (healthReportId: string) =>
			`/api/v1/health-report/${healthReportId}`,
	},
} as const;
