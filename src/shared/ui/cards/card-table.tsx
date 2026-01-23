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
			<div
				className={cn(
					"grid grid-cols-[11rem_18.5rem] items-center rounded-[12px] bg-gray-200",
					"body01-sb-12 text-gray-900",
				)}
			>
				<div className="min-w-0 px-[2rem] py-[0.8rem]">{headerLeft}</div>
				<div className="min-w-0 px-[2rem] py-[0.8rem]">{headerRight}</div>
			</div>
			{rows.map((row) => (
				<div
					key={row.id}
					className="grid w-full grid-cols-[11rem_18.5rem] items-center rounded-[12px] bg-white"
				>
					<div className="body05-r-12 min-w-0 whitespace-pre-line break-words px-[2rem] py-[0.8rem] text-left text-gray-900">
						{row.label}
					</div>
					<div className="body05-r-12 min-w-0 whitespace-pre-line break-words px-[2rem] py-[0.8rem] text-left text-gray-900">
						{row.value}
					</div>
				</div>
			))}
		</div>
	);
};
