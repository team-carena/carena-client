import { useState } from "react";
import { LargeBadge } from "@/shared/ui/badges/large-badge";
import { DropDown } from "@/shared/ui/drop-down/drop-down";
import {
	RADAR_CHART_MAP,
	RadarChart,
} from "@/shared/ui/graphs/radar-chart/radar-chart";
import { Tooltip } from "@/shared/ui/overlays/tooltip/tooltip";

const HealthAnalysisPage = () => {
	const [selectedDate, setSelectedDate] = useState("2025-02-18");
	const options = [
		{
			value: "2025-02-18",
			label: "2025년 02월 18일",
			subLabel: "서울의료원",
		},
		{
			value: "2024-02-18",
			label: "2024년 02월 18일",
			subLabel: "강남세브란스",
		},
	];
	const radarData = [
		{ label: "당뇨", riskLevel: RADAR_CHART_MAP.의심 },
		{ label: "혈압", riskLevel: RADAR_CHART_MAP.경계 },
		{ label: "빈혈", riskLevel: RADAR_CHART_MAP.경계 },
		{ label: "신장질환", riskLevel: RADAR_CHART_MAP.정상 },
		{ label: "간장질환", riskLevel: RADAR_CHART_MAP.정상 },
		{ label: "비만", riskLevel: RADAR_CHART_MAP.경계 },
	];

	return (
		<div className="flex flex-col w-full pt-[2.4rem] px-[2rem]">
			<div className="mb-[2rem]">
				<DropDown
					value={selectedDate}
					onValueChange={setSelectedDate}
					options={options}
				/>
			</div>
			<div className="flex items-center gap-[0.3rem]">
				<LargeBadge variant="borderline">정상B</LargeBadge>
				<Tooltip side="bottom" align="start" iconTone="black">
					검진 결과의 종합 등급을 요약해서 보여줍니다.
				</Tooltip>
			</div>
			<div className="mt-[-4.8rem]">
				<RadarChart data={radarData} />
			</div>
		</div>
	);
};

export default HealthAnalysisPage;
