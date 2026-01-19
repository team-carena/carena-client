import { ChevronMRight } from "@shared/assets/svg";
import { cn } from "@shared/libs/cn";
import { Link } from "react-router";

export interface NaviRowProps {
	label: string;
	to: string;
	className?: string;
}

export const NaviRow = ({ label, to, className }: NaviRowProps) => {
	return (
		<Link
			to={to}
			className={cn(
				`flex w-full items-center justify-between rounded-[8px] px-[0.8rem] py-[0.4rem] text-gray-900 transition-default active:bg-gray-100`,
				className,
			)}
		>
			<span className="head03-sb-16 flex-[1_0_0] text-left">{label}</span>
			<ChevronMRight className="shrink-0" aria-hidden />
		</Link>
	);
};
