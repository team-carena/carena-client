import type * as React from "react";
import { cn } from "@/shared/libs/cn";

export type ResultChangeType = "increase" | "decrease";

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
				"relative min-h-[58px] w-full rounded-[12px] border border-gray-300 px-[1.2rem] py-[1.2rem]",
				className,
			)}
			{...props}
		>
			{/* label */}
			<span
				className={cn(
					"body05-r-12 absolute top-0 left-[1.5rem] -translate-y-1/2 bg-gray-50 px-[0.2rem] py-[0.2rem] text-primary-300",
				)}
			>
				{LABEL_TEXT[type]}
			</span>

			{/* description */}
			<p className="body05-r-12 whitespace-pre-line text-gray-900">
				{description}
			</p>
		</div>
	);
};
