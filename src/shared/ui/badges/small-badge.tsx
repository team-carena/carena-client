import { cn } from "@shared/libs/cn";
import { cva, type VariantProps } from "class-variance-authority";

const smallBadgeVariants = cva(
	"label01-sb-14 inline-flex w-fit items-center justify-center rounded-full px-[0.8rem] py-[0.4rem]",
	{
		variants: {
			variant: {
				normal: "bg-green-100 text-green-500",
				borderline: "bg-orange-100 text-orange-500",
				suspicious: "bg-red-100 text-red-500",
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
