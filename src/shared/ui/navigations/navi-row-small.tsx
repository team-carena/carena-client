import { cn } from "@shared/libs/cn";
import { Link } from "react-router";

export interface NaviRowSmallProps {
	label: string;
	actionLabel?: string;
	to: string;
	className?: string;
}

export const NaviRowSmall = ({
	label,
	actionLabel = "더보기",
	to,
	className,
}: NaviRowSmallProps) => {
	return (
		<Link
			to={to}
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
		>
			<span className="flex-[1_0_0] body04-r-14 text-left">{label}</span>
			<span className="shrink-0 label06-r-12">{actionLabel}</span>
		</Link>
	);
};
