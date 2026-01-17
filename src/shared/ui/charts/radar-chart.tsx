import {
	PolarAngleAxis,
	PolarGrid,
	Radar,
	RadarChart as RechartsRadarChart,
} from "recharts";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "./chart";

export interface RadarChartDataPoint {
	label: string;
	value: number;
}

interface RadarChartProps {
	data: RadarChartDataPoint[];
	className?: string;
	showTooltip?: boolean;
	color?: string;
	fillOpacity?: number;
	dotRadius?: number;
	dotColor?: string;
}

const chartConfig = {
	value: {
		label: "Value",
		color: "var(--color-secondary-400)",
	},
} satisfies ChartConfig;

export function RadarChart({
	data,
	className,
	showTooltip = true,
	color = "var(--color-secondary-400)",
	fillOpacity = 0.2,
	dotRadius = 4,
	dotColor,
}: RadarChartProps) {
	const config = {
		...chartConfig,
		value: {
			...chartConfig.value,
			color,
		},
	};

	return (
		<ChartContainer config={config} className={className}>
			<RechartsRadarChart data={data}>
				{showTooltip && (
					<ChartTooltip cursor={false} content={<ChartTooltipContent />} />
				)}
				<PolarAngleAxis dataKey="label" />
				<PolarGrid radialLines={false} />
				<Radar
					dataKey="value"
					fill={color}
					fillOpacity={fillOpacity}
					stroke={color}
					dot={{
						r: dotRadius,
						fillOpacity: 1,
						fill: dotColor || color,
					}}
				/>
			</RechartsRadarChart>
		</ChartContainer>
	);
}
