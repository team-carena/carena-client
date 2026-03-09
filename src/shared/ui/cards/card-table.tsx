import { cn } from "@/shared/libs/cn";

interface CardTableRow {
	id: string;
	label: React.ReactNode;
	value: React.ReactNode;
}

interface CardTableProps extends React.HTMLAttributes<HTMLDivElement> {
	headerLeft: React.ReactNode;
	headerRight: React.ReactNode;
	rows: readonly CardTableRow[];
}

const TABLE_COLS = "grid-cols-[14rem_minmax(0,1fr)]";
const CELL_PADDING = "px-[1.2rem] py-[1.2rem]";

export const CardTable = ({
	className,
	headerLeft,
	headerRight,
	rows,
	...props
}: CardTableProps) => {
	return (
		<div
			className={cn("flex w-full flex-col gap-[0.4rem]", className)}
			{...props}
		>
			{/* Header */}
			<div
				className={cn(
					"grid w-full items-center rounded-[8px] bg-primary-50",
					TABLE_COLS,
					"body01-sb-12 text-gray-900",
				)}
			>
				<div className={cn("min-w-0", CELL_PADDING)}>{headerLeft}</div>
				<div className={cn("min-w-0", CELL_PADDING)}>{headerRight}</div>
			</div>

			{/* Rows */}
			{rows.map((row) => (
				<div
					key={row.id}
					className={cn(
						"grid w-full items-center rounded-[8px] bg-white",
						TABLE_COLS,
					)}
				>
					<div
						className={cn(
							"body05-r-12 min-w-0 whitespace-pre-line break-words text-gray-900",
							CELL_PADDING,
						)}
					>
						{row.label}
					</div>
					<div
						className={cn(
							"body05-r-12 min-w-0 whitespace-pre-line break-words text-gray-900",
							CELL_PADDING,
						)}
					>
						{row.value}
					</div>
				</div>
			))}
		</div>
	);
};
