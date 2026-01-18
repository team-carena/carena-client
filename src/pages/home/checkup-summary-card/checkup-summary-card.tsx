import type * as React from "react";
import { cn } from "@/shared/libs/cn";
import { SmallBadge } from "@/shared/ui/badges/small-badge";
import type {
	HealthMetricType,
	Sex,
} from "@/shared/ui/graphs/range-bar/health-metric-config";
import { getRangeBarData } from "@/shared/ui/graphs/range-bar/health-metric-config";
import { RangeBar } from "@/shared/ui/graphs/range-bar/range-bar";
import { NaviRow } from "@/shared/ui/navigations/navi-row";

type SectionVariant = "header" | "content";

interface CheckupSummaryCardRootProps {
	className?: string;
	children: React.ReactNode;
}

interface SectionProps {
	className?: string;
	children: React.ReactNode;
	variant?: SectionVariant;
}

interface TitleProps {
	label: string;
	to: string;
	className?: string;
}

interface DescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
	children: React.ReactNode;
}

interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
	left: React.ReactNode;
	right: React.ReactNode;
}

interface RowWithBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
	label: React.ReactNode;
	value: number;
	badgeVariant?: "normal" | "borderline" | "suspicious";
	badgeText: React.ReactNode;
	metricKey: HealthMetricType;
	metricSex?: Sex;
	rangeBarData?: RangeBarData;
}

type RowWithBadgeAndGraphProps = RowWithBadgeProps;

interface MetricRangeBarProps {
	value: number;
	rangeBarData: RangeBarData;
}

type RangeBarData = ReturnType<typeof getRangeBarData>;

const sectionVariantClassName: Record<SectionVariant, string> = {
	header: "px-[2rem] pt-[2rem] pb-[1.2rem]",
	content: "px-[2rem] py-[1.2rem]",
};

const MetricRangeBar = ({ value, rangeBarData }: MetricRangeBarProps) => {
	const { domainMin, domainMax, segments } = rangeBarData;

	return (
		<RangeBar
			value={value}
			domainMin={domainMin}
			domainMax={domainMax}
			segments={segments}
		/>
	);
};

const ValueWithUnit = ({ value, unit }: { value: number; unit: string }) => {
	return (
		<span className="inline-flex items-baseline">
			<span>{value}</span>
			<span className="ml-[0.4rem] label02-m-14 text-gray-900">{unit}</span>
		</span>
	);
};

const Root = ({ className, children }: CheckupSummaryCardRootProps) => (
	<div
		className={cn(
			"w-full rounded-[12px] bg-gray-50 overflow-hidden",
			className,
		)}
	>
		{children}
	</div>
);

const Section = ({
	className,
	children,
	variant = "content",
}: SectionProps) => (
	<div
		className={cn(
			"w-full bg-white",
			sectionVariantClassName[variant],
			className,
		)}
	>
		{children}
	</div>
);

const Title = ({ className, label, to }: TitleProps) => (
	<NaviRow
		label={label}
		to={to}
		className={cn(
			"w-full h-[4.8rem] bg-white rounded-none px-[2rem] py-0",
			className,
		)}
	/>
);

const Description = ({ className, children, ...props }: DescriptionProps) => (
	<p
		className={cn("body05-r-12 text-gray-700 mb-[1.2rem]", className)}
		{...props}
	>
		{children}
	</p>
);

const Rows = ({
	className,
	children,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => (
	<div className={cn("space-y-[1.2rem]", className)} {...props}>
		{children}
	</div>
);

const Row = ({ className, left, right, ...props }: RowProps) => (
	<div
		className={cn("flex items-center justify-between", className)}
		{...props}
	>
		<div className="body04-r-14 text-gray-900">{left}</div>
		<div className="flex items-center gap-[0.8rem] label02-m-14 text-gray-900">
			{right}
		</div>
	</div>
);

const RowWithBadge = ({
	className,
	label,
	value,
	badgeVariant = "normal",
	badgeText,
	metricKey,
	metricSex,
	rangeBarData,
	...props
}: RowWithBadgeProps) => {
	const displayUnit =
		rangeBarData?.unit ?? getRangeBarData(metricKey, metricSex).unit;

	return (
		<div
			className={cn("flex items-center justify-between", className)}
			{...props}
		>
			<div className="body04-r-14 text-gray-900">{label}</div>
			<div className="flex items-center gap-[0.8rem]">
				<span className="label02-m-14 text-gray-900">
					<ValueWithUnit value={value} unit={displayUnit} />
				</span>
				<SmallBadge
					variant={badgeVariant}
					className="w-[4.1rem] h-[2.8rem] flex items-center justify-center"
				>
					{badgeText}
				</SmallBadge>
			</div>
		</div>
	);
};

const RowWithBadgeAndGraph = ({
	className,
	label,
	value,
	badgeVariant = "normal",
	badgeText,
	metricKey,
	metricSex,
	...props
}: RowWithBadgeAndGraphProps) => {
	const rangeBarData = getRangeBarData(metricKey, metricSex);

	return (
		<div className={cn("space-y-[1.6rem] mb-[1.2rem] ", className)} {...props}>
			<RowWithBadge
				label={label}
				value={value}
				badgeVariant={badgeVariant}
				badgeText={badgeText}
				metricKey={metricKey}
				metricSex={metricSex}
				rangeBarData={rangeBarData}
			/>
			<MetricRangeBar value={value} rangeBarData={rangeBarData} />
		</div>
	);
};

const CheckupSummaryCard = Object.assign(Root, {
	Section,
	Title,
	Description,
	Rows,
	Row,
	RowWithBadge,
	RowWithBadgeAndGraph,
	MetricRangeBar,
});

export default CheckupSummaryCard;
