import type {
	DisplayElement,
	EntireHealthReportView,
	RiskLevelLabel,
} from "@/shared/configs/health-report/health-report.types";
import {
	RADAR_CHART_MAP,
	type RadarChartDataPoint,
	type RiskLevelKey,
} from "@/shared/ui/graphs/radar-chart/radar-chart";

const RISK_RANK: Record<RiskLevelLabel, number> = {
	NONE: 0,
	NORMAL: 1,
	BORDERLINE: 2,
	SUSPICIOUS: 3,
};

const getRiskRank = (label?: RiskLevelLabel) =>
	label ? RISK_RANK[label] : RISK_RANK.NONE;

const getRiskKey = (label?: RiskLevelLabel): RiskLevelKey => {
	if (label === "SUSPICIOUS") return "의심";
	if (label === "BORDERLINE") return "경계";
	return "정상";
};

const getHighestRiskLabel = (items?: DisplayElement[]) => {
	let highest: RiskLevelLabel = "NONE";
	items?.forEach((item) => {
		if (!item) return;
		const candidate = item.riskLevelLabel;
		if (getRiskRank(candidate) > getRiskRank(highest)) {
			highest = candidate ?? highest;
		}
	});
	return highest;
};

const buildRadarData = (
	report?: EntireHealthReportView,
): RadarChartDataPoint[] => {
	const basic = report?.basic ?? [];
	const bmi = basic.find((item) => item.name === "bmi");

	return [
		{
			label: "당뇨",
			riskLevel:
				RADAR_CHART_MAP[getRiskKey(getHighestRiskLabel(report?.diabetes))],
		},
		{
			label: "빈혈",
			riskLevel:
				RADAR_CHART_MAP[getRiskKey(getHighestRiskLabel(report?.anemia))],
		},
		{
			label: "신장질환",
			riskLevel:
				RADAR_CHART_MAP[getRiskKey(getHighestRiskLabel(report?.kidney))],
		},
		{
			label: "간장질환",
			riskLevel:
				RADAR_CHART_MAP[getRiskKey(getHighestRiskLabel(report?.liver))],
		},
		{
			label: "비만",
			riskLevel:
				RADAR_CHART_MAP[getRiskKey(getHighestRiskLabel(bmi ? [bmi] : []))],
		},
		{
			label: "혈압",
			riskLevel:
				RADAR_CHART_MAP[getRiskKey(getHighestRiskLabel(report?.bloodPressure))],
		},
	];
};

export { buildRadarData };
