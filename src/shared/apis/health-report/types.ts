export type {
	DisplayElement,
	EntireHealthReportView,
	RiskLevelLabel,
} from "@/shared/apis/generated/data-contracts";

export interface ReportDateInfo {
	healthReportId?: string;
	healthCheckDate?: string;
	institutionName?: string;
}

export interface HealthReportDateListView {
	reportDates?: ReportDateInfo[];
	hasNext?: boolean;
}

export interface GetHealthReportDateListParams {
	index: number;
}

export interface GetEntireHealthReportParams {
	healthReportId: string;
}
