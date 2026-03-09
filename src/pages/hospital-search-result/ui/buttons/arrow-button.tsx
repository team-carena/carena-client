import type { ButtonHTMLAttributes, ComponentType } from "react";
import { cn } from "@/shared/libs/cn";

interface ArrowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	icon: ComponentType<{ className?: string }>;
	disabledIcon: ComponentType<{ className?: string }>;
}

const ArrowButton = ({
	className,
	icon: Icon,
	disabledIcon: DisabledIcon,
	disabled = false,
	...props
}: ArrowButtonProps) => {
	const RenderIcon = disabled ? DisabledIcon : Icon;

	return (
		<button
			type="button"
			disabled={disabled}
			aria-disabled={disabled}
			className={cn(
				"flex h-[3.2rem] w-[3.2rem] items-center justify-center transition-default",
				"disabled:cursor-not-allowed",
				className,
			)}
			{...props}
		>
			<RenderIcon className="pointer-events-none" />
		</button>
	);
};

export { ArrowButton };
