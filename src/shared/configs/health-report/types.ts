export type {
	DisplayElement,
	EntireHealthReportView,
	HealthReportDateListView,
	ReportDateInfo,
	RiskLevelLabel,
} from "@/shared/apis/generated/data-contracts";

export interface GetHealthReportDateListParams {
	index: number;
}

export interface GetEntireHealthReportParams {
	healthReportId: string;
}
