import {
	RADAR_CHART_MAP,
	RadarChart,
} from "@/shared/ui/charts/radar-chart/radar-chart";

// import { useSuspenseQuery } from "@tanstack/react-query";

// 예시 데이터 (API 연결 전 테스트용)
const radarData = [
	{ label: "혈압", value: RADAR_CHART_MAP["정상"] },
	{ label: "빈혈", value: RADAR_CHART_MAP["경계"] },
	{ label: "신장질환", value: RADAR_CHART_MAP["위험"] },
	{ label: "간장질환", value: RADAR_CHART_MAP["정상"] },
	{ label: "비만", value: RADAR_CHART_MAP["경계"] },
	{ label: "당뇨", value: RADAR_CHART_MAP["위험"] },
];

export const HomePage = () => {
	// TODO: API 연결 후
	// const { data } = useSuspenseQuery();
	// const radarData = data.map((item) => ({
	// 	label: item.name,
	// 	value: RADAR_CHART_MAP[item.value] ?? 0,
	// }))

	return (
		<div className="p-[2rem]">
			<RadarChart data={radarData} />
		</div>
	);
};
