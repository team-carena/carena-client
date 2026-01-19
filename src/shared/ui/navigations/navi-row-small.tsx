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
				`flex w-full items-center justify-between rounded-[0.4rem] px-[0.8rem] py-[0.4rem] text-gray-600 transition-default active:bg-gray-100 active:text-gray-900`,
				className,
			)}
		>
			<span className="body04-r-14 flex-[1_0_0] text-left">{label}</span>
			<span className="label06-r-12 shrink-0">{actionLabel}</span>
		</Link>
	);
};
