import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";
import { type ChartConfig, ChartContainer } from "./chart";

const chartConfig = {
	score: {
		label: "건강점수",
		color: "var(--color-secondary-400)",
	},
	remaining: {
		label: "남은점수",
		color: "var(--color-gray-50)",
	},
} satisfies ChartConfig;

interface RadialChartProps {
	score: number;
	className?: string;
}

export function RadialChart({ score, className }: RadialChartProps) {
	const data = [{ score, remaining: 100 - score }];
	const outerRadius = 74;
	const innerRadius = 44;
	const chartSize = outerRadius * 1.45; // 배경이 되는 흰색 원의 가로길이 (약 108px)

	return (
		<div
			className={`relative ${className ?? ""}`}
			style={{ width: chartSize, height: chartSize }}
		>
			{/* 배경 흰색 원 */}
			<div
				className="absolute inset-0 rounded-full bg-white"
				style={{ width: chartSize, height: chartSize }}
			/>
			{/* 차트 */}
			<ChartContainer
				config={chartConfig}
				className="absolute inset-0 !aspect-auto"
			>
				<RadialBarChart
					data={data}
					startAngle={90}
					endAngle={-270}
					innerRadius={innerRadius}
					outerRadius={outerRadius}
				>
					<defs>
						<filter
							id="chartShadow"
							x="-50%"
							y="-50%"
							width="200%"
							height="200%"
						>
							<feDropShadow
								dx="0"
								dy="0"
								stdDeviation="3"
								floodColor="rgba(0, 0, 0, 0.4)"
							/>
						</filter>
					</defs>
					<PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
						<Label
							content={({ viewBox }) => {
								if (viewBox && "cx" in viewBox && "cy" in viewBox) {
									const cx = viewBox.cx || 0;
									const cy = viewBox.cy || 0;
									return (
										<text x={cx} y={cy} textAnchor="middle">
											<tspan
												x={cx}
												y={cy - 5}
												className="fill-gray-900"
												fontSize="12"
												fontWeight="400"
											>
												건강점수
											</tspan>
											<tspan
												x={cx}
												y={cy + 13}
												className="fill-gray-900"
												fontSize="14"
												fontWeight="700"
											>
												{score}점
											</tspan>
										</text>
									);
								}
							}}
						/>
					</PolarRadiusAxis>
					<RadialBar
						dataKey="score"
						stackId="a"
						fill="var(--color-score)"
						stroke="white"
						strokeWidth={1}
						style={{ filter: "url(#chartShadow)" }}
					/>
					<RadialBar
						dataKey="remaining"
						stackId="a"
						fill="var(--color-remaining)"
						stroke="white"
						strokeWidth={1}
						// style={{ filter: "url(#chartShadow)" }}
					/>
				</RadialBarChart>
			</ChartContainer>
		</div>
	);
}
