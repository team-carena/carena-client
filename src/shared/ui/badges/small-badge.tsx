import { cn } from "@shared/libs/cn";
import { cva, type VariantProps } from "class-variance-authority";

const smallBadgeVariants = cva(
	"label01-sb-14 inline-flex w-fit items-center justify-center rounded-full px-[0.8rem] py-[0.4rem] text-white",
	{
		variants: {
			variant: {
				normal: "bg-green-500",
				borderline: "bg-blue-500",
				suspicious: "bg-red-500",
			},
		},
		defaultVariants: {
			variant: "normal",
		},
	},
);

export type SmallBadgeVariant = VariantProps<
	typeof smallBadgeVariants
>["variant"];

export interface SmallBadgeProps
	extends React.HTMLAttributes<HTMLSpanElement>,
		VariantProps<typeof smallBadgeVariants> {
	children: React.ReactNode;
}

export const SmallBadge = ({
	className,
	variant,
	children,
	...props
}: SmallBadgeProps) => {
	return (
		<span className={cn(smallBadgeVariants({ variant }), className)} {...props}>
			{children}
		</span>
	);
};
