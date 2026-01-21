import type {
	DisplayElement,
	EntireHealthReportView,
	RiskLevelLabel,
} from "@/shared/configs/health-report/types";
import type { CheckupBadgeCode } from "@/shared/constants/checkup-badge";

const toBadgeVariant = (label?: RiskLevelLabel): CheckupBadgeCode => {
	if (label === "SUSPICIOUS") return "suspicious";
	if (label === "BORDERLINE") return "borderline";
	return "normal";
};

const getHighestRiskLabel = (labels: RiskLevelLabel[]) => {
	if (labels.includes("SUSPICIOUS")) return "SUSPICIOUS";
	if (labels.includes("BORDERLINE")) return "BORDERLINE";
	if (labels.includes("NORMAL")) return "NORMAL";
	return "NONE";
};

const getSummaryBadgeState = (
	report?: EntireHealthReportView,
): { variant: CheckupBadgeCode; text: string } => {
	const lists = [
		report?.basic,
		report?.bloodPressure,
		report?.diabetes,
		report?.liver,
		report?.kidney,
		report?.anemia,
	];
	const labels = lists
		.flatMap((list) => list ?? [])
		.map((item) => item?.riskLevelLabel)
		.filter((label): label is RiskLevelLabel => Boolean(label));
	const highestLabel = getHighestRiskLabel(labels);

	if (highestLabel === "SUSPICIOUS") {
		return { variant: toBadgeVariant(highestLabel), text: "의심" };
	}
	if (highestLabel === "BORDERLINE") {
		return { variant: toBadgeVariant(highestLabel), text: "정상 B(경계)" };
	}
	return { variant: toBadgeVariant(highestLabel), text: "정상 A" };
};

const getElementBadgeCode = (element?: DisplayElement) =>
	toBadgeVariant(element?.riskLevelLabel);

export { getElementBadgeCode, getSummaryBadgeState };
