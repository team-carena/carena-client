import {
	Label,
	PolarAngleAxis,
	PolarRadiusAxis,
	RadialBar,
	RadialBarChart,
} from "recharts";
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
	const data = [{ score }];
	const chartSize = 120;
	const outerRadius = 89;
	const innerRadius = 49; // 두께: 40px

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
				className="!aspect-auto absolute inset-0"
			>
				<RadialBarChart
					data={data}
					startAngle={90}
					endAngle={-270}
					innerRadius={innerRadius}
					outerRadius={outerRadius}
				>
					{/* domain=[0, 100]으로 설정해 score가 100 기준 비율로 표시되도록 함 */}
					<PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
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
					{/* background: 회색 배경(100%), RadialBar: 보라색 점수가 그 위에 겹쳐서 표시 */}
					<RadialBar
						dataKey="score"
						fill="var(--color-score)"
						stroke="var(--color-white)"
						strokeWidth={1}
						cornerRadius={1.5}
						style={{ filter: "url(#chartShadow)" }}
						background={{ fill: "var(--color-remaining)" }}
					/>
				</RadialBarChart>
			</ChartContainer>
		</div>
	);
}
