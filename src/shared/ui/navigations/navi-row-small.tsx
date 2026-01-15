import { cn } from "@shared/libs/cn";
import * as React from "react";

export interface NaviRowSmallProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	label: string;
	actionLabel?: string;
}

export const NaviRowSmall = React.forwardRef<
	HTMLButtonElement,
	NaviRowSmallProps
>(({ label, actionLabel = "더보기", className, ...props }, ref) => {
	return (
		<button
			ref={ref}
			type="button"
			className={cn(
				`
          flex items-center justify-between
          w-full
          px-[0.8rem] py-[0.4rem]
          rounded-[0.4rem]
          text-gray-600
          transition-default
          active:bg-gray-100 active:text-gray-900
        `,
				className,
			)}
			{...props}
		>
			{/* left text */}
			<span className="flex-[1_0_0] body04-r-14 text-left">{label}</span>

			{/* right text */}
			<span className="shrink-0 label06-r-12">{actionLabel}</span>
		</button>
	);
});

NaviRowSmall.displayName = "NaviRowSmall";
