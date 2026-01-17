import { RadarChart } from "@/shared/ui/charts";

const radarData = [
	{ label: "당뇨", value: 2 },
	{ label: "혈압", value: 2.5 },
	{ label: "빈혈", value: 1.5 },
	{ label: "신장질환", value: 1.8 },
	{ label: "간장질환", value: 2.2 },
	{ label: "비만", value: 1.5 },
];

export const HomePage = () => {
	return (
		<div className="p-[2rem]">
			<div className="bg-white rounded-[1.2rem] p-[2rem]">
				<h2 className="head02-b-16 mb-[1.6rem]">건강 상태 분석</h2>
				<RadarChart
					data={radarData}
					className="mx-auto aspect-square max-h-[300px]"
					color="var(--color-secondary-300)"
					fillOpacity={0.2}
					dotRadius={2}
					dotColor="var(--color-secondary-700)"
				/>
			</div>
		</div>
	);
};
