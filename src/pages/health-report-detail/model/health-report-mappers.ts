import type { LineChartData } from "@/shared/ui/graphs/line-chart/line-chart";

type HistoryItem = {
	value: number;
	healthCheckDate: string; // "YYYY-01-21"
};

export const mapHistoryToLineChartData = (
	history: HistoryItem[],
): LineChartData[] => {
	return history.map((item) => ({
		date: item.healthCheckDate,
		value: item.value,
	}));
};
