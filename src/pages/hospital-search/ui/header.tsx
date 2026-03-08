import type React from "react";
import { ChevronSRight } from "@/shared/assets/svg";
import { cn } from "@/shared/libs/cn";

type HeaderProps<T extends React.ElementType = "button"> = {
	as?: T;
	title: string;
	icon?: boolean;
} & React.ComponentPropsWithoutRef<T>;

export function Header<T extends React.ElementType = "button">({
	as,
	title,
	icon = false,
	className,
	...props
}: HeaderProps<T>) {
	const Component = as || "button";

	return (
		<Component
			className={cn(
				"flex h-[2.8rem] w-full items-center justify-between text-gray-900",
				className,
			)}
			{...props}
		>
			<span className="head03-sb-16 flex-[1_0_0] text-left">{title}</span>
			{icon && (
				<ChevronSRight className="h-[2.4rem] w-[2.4rem] shrink-0" aria-hidden />
			)}
		</Component>
	);
}
