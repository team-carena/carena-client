import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";
import { type ChartConfig, ChartContainer } from "./chart";

const chartConfig = {
	score: {
		label: "건강점수",
		color: "var(--color-secondary-400)",
	},
	remaining: {
		label: "남은점수",
		color: "var(--color-white)",
	},
} satisfies ChartConfig;

interface RadialChartProps {
	score: number;
	className?: string;
}

export function RadialChart({ score, className }: RadialChartProps) {
	const data = [{ score, remaining: 100 - score }];

	return (
		<ChartContainer config={chartConfig} className={className}>
			<RadialBarChart
				data={data}
				startAngle={90}
				endAngle={-270}
				innerRadius={60}
				outerRadius={80}
			>
				<PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
					<Label
						content={({ viewBox }) => {
							if (viewBox && "cx" in viewBox && "cy" in viewBox) {
								return (
									<text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
										<tspan
											x={viewBox.cx}
											y={(viewBox.cy || 0) - 8}
											className="fill-gray-600 text-[12px]"
										>
											<span className="body05-r-12 text-black">건강점수</span>
										</tspan>
										<tspan
											x={viewBox.cx}
											y={(viewBox.cy || 0) + 16}
											className="fill-gray-900 text-[24px] font-bold"
										>
											<span className="body01-sb-12 text-black">{score}점</span>
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
					cornerRadius={10}
					fill="var(--color-score)"
					className="stroke-transparent"
				/>
				<RadialBar
					dataKey="remaining"
					stackId="a"
					cornerRadius={10}
					fill="var(--color-remaining)"
					className="stroke-transparent"
				/>
			</RadialBarChart>
		</ChartContainer>
	);
}
