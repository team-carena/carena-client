import type * as React from "react";
import { cn } from "@/shared/libs/cn";

type ResultChangeType = "increase" | "decrease";

interface CardResultMeaningProps extends React.HTMLAttributes<HTMLDivElement> {
	type: ResultChangeType;
	description: string;
}

const LABEL_TEXT: Record<ResultChangeType, string> = {
	increase: "증가",
	decrease: "감소",
};

export const CardResultMeaning = ({
	type,
	description,
	className,
	...props
}: CardResultMeaningProps) => {
	return (
		<div
			className={cn(
				"relative w-full min-h-[58px] rounded-[12px] border border-gray-300 px-[1.2rem] py-[1.2rem]",
				className,
			)}
			{...props}
		>
			{/* label */}
			<span
				className={cn(
					"absolute left-[1.5rem] top-0 -translate-y-1/2",
					"px-[0.2rem] py-[0.2rem]",
					"body05-r-12 text-primary-300",
					"bg-gray-50",
				)}
			>
				{LABEL_TEXT[type]}
			</span>

			{/* description */}
			<p className="body05-r-12 text-gray-900">{description}</p>
		</div>
	);
};
