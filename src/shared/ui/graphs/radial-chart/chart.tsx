import * as React from "react";
import * as RechartsPrimitive from "recharts";

import { cn } from "@/shared/libs/cn";

export type ChartConfig = {
	[k in string]: {
		label?: React.ReactNode;
		icon?: React.ComponentType;
		color?: string;
	};
};

type ChartContextProps = {
	config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

function ChartContainer({
	id,
	className,
	children,
	config,
	...props
}: React.ComponentProps<"div"> & {
	config: ChartConfig;
	children: React.ComponentProps<
		typeof RechartsPrimitive.ResponsiveContainer
	>["children"];
}) {
	const uniqueId = React.useId();
	const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

	// config에서 색상을 CSS 변수로 변환
	const colorVariables = React.useMemo(() => {
		const variables: Record<string, string> = {};
		for (const [key, value] of Object.entries(config)) {
			if (value.color) {
				variables[`--color-${key}`] = value.color;
			}
		}
		return variables;
	}, [config]);

	return (
		<ChartContext.Provider value={{ config }}>
			<div
				data-slot="chart"
				data-chart={chartId}
				style={colorVariables}
				className={cn(
					"flex aspect-video justify-center text-xs [&_.recharts-layer]:outline-hidden [&_.recharts-sector]:outline-hidden [&_.recharts-surface]:outline-hidden",
					className,
				)}
				{...props}
			>
				<RechartsPrimitive.ResponsiveContainer>
					{children}
				</RechartsPrimitive.ResponsiveContainer>
			</div>
		</ChartContext.Provider>
	);
}

export { ChartContainer };
