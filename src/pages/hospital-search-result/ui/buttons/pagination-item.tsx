import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/shared/libs/cn";

interface PaginationItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	isActive?: boolean;
}

const PaginationItem = ({
	className,
	isActive = false,
	children,
	...props
}: PaginationItemProps) => {
	return (
		<button
			type="button"
			className={cn(
				"label01-sb-14 flex h-[3.2rem] w-[3.2rem] items-center justify-center rounded-[0.4rem] transition-default",
				isActive ? "bg-white text-primary-500" : "text-gray-900",
				"disabled:cursor-not-allowed disabled:text-gray-300",
				className,
			)}
			aria-current={isActive ? "page" : undefined}
			{...props}
		>
			{children}
		</button>
	);
};

export { PaginationItem };
