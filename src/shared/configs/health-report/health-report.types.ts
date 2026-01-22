export type {
	DisplayElement,
	EntireHealthReportView,
	HealthReportDateListView,
	ReportDateInfo,
} from "@/shared/apis/generated/data-contracts";

export type RiskLevelLabel = "NONE" | "NORMAL" | "BORDERLINE" | "SUSPICIOUS";

export interface GetHealthReportDateListParams {
	index: number;
}

export interface GetEntireHealthReportParams {
	healthReportId: string;
}
