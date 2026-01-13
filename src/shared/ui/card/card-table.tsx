import { cn } from "@/shared/libs/cn";

type CardTableRow = {
	id: string;
	label: React.ReactNode;
	value: React.ReactNode;
};

type CardTableProps = React.HTMLAttributes<HTMLDivElement> & {
	headerLeft: React.ReactNode;
	headerRight: React.ReactNode;
	rows: readonly [CardTableRow, CardTableRow, CardTableRow];
};

export const CardTable = ({
	className,
	headerLeft,
	headerRight,
	rows,
	...props
}: CardTableProps) => {
	return (
		<div className={cn("w-full flex flex-col gap-[4px]", className)} {...props}>
			<div
				className={cn(
					"grid grid-cols-[110px_185px] items-center rounded-[12px] bg-gray-200",
					"body01-sb-12 text-gray-900",
				)}
			>
				<div className="min-w-0 px-[20px] py-[8px]">{headerLeft}</div>
				<div className="min-w-0 px-[20px] py-[8px]">{headerRight}</div>
			</div>
			{rows.map((row) => (
				<div
					key={row.id}
					className="grid w-full grid-cols-[110px_185px] items-center rounded-[12px] bg-white px-[20px] py-[8px]"
				>
					<div className="min-w-0 text-left text-black body05-r-12 whitespace-pre-line break-words">
						{row.label}
					</div>
					<div className="min-w-0 text-left text-black body05-r-12 whitespace-pre-line break-words">
						{row.value}
					</div>
				</div>
			))}
		</div>
	);
};
