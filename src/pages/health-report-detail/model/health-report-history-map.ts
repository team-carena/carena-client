import { API_ENDPOINTS } from "@/shared/apis/api-endpoints";
import { queryKeys } from "@/shared/apis/query-keys";
import type { HealthHistoryItemKey } from "../config/health-report-types";

export const HEALTH_REPORT_HISTORY_MAP: Record<
	HealthHistoryItemKey,
	{
		endpoint: string;
		queryKey: () => readonly unknown[];
	}
> = {
	height: {
		endpoint: API_ENDPOINTS.healthReport.measurement.height,
		queryKey: queryKeys.healthReport.history.height,
	},
	weight: {
		endpoint: API_ENDPOINTS.healthReport.measurement.weight,
		queryKey: queryKeys.healthReport.history.weight,
	},
	waistCircumference: {
		endpoint: API_ENDPOINTS.healthReport.measurement.waistCircumference,
		queryKey: queryKeys.healthReport.history.waistCircumference,
	},
	bmi: {
		endpoint: API_ENDPOINTS.healthReport.measurement.bmi,
		queryKey: queryKeys.healthReport.history.bmi,
	},

	systolicBp: {
		endpoint: API_ENDPOINTS.healthReport.bloodPressure.systolic,
		queryKey: queryKeys.healthReport.history.systolicBp,
	},
	diastolicBp: {
		endpoint: API_ENDPOINTS.healthReport.bloodPressure.diastolic,
		queryKey: queryKeys.healthReport.history.diastolicBp,
	},

	fastingGlucose: {
		endpoint: API_ENDPOINTS.healthReport.diabetes.fastingGlucose,
		queryKey: queryKeys.healthReport.history.fastingGlucose,
	},

	ast: {
		endpoint: API_ENDPOINTS.healthReport.liver.ast,
		queryKey: queryKeys.healthReport.history.ast,
	},
	alt: {
		endpoint: API_ENDPOINTS.healthReport.liver.alt,
		queryKey: queryKeys.healthReport.history.alt,
	},
	gammaGtp: {
		endpoint: API_ENDPOINTS.healthReport.liver.gammaGtp,
		queryKey: queryKeys.healthReport.history.gammaGtp,
	},

	serumCreatinine: {
		endpoint: API_ENDPOINTS.healthReport.kidney.serumCreatinine,
		queryKey: queryKeys.healthReport.history.serumCreatinine,
	},
	egfr: {
		endpoint: API_ENDPOINTS.healthReport.kidney.egfr,
		queryKey: queryKeys.healthReport.history.egfr,
	},

	hemoglobin: {
		endpoint: API_ENDPOINTS.healthReport.anemia.hemoglobin,
		queryKey: queryKeys.healthReport.history.hemoglobin,
	},
};
