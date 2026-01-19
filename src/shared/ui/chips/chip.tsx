import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/libs/cn";

const chipVariants = cva(
	"label05-r-14 inline-flex w-fit items-center justify-center rounded-full border px-[1.6rem] py-[0.8rem]",
	{
		variants: {
			status: {
				on: "border-primary-500 bg-primary-50 text-primary-500",
				off: "border-gray-300 bg-white text-gray-900",
			},
		},
		defaultVariants: {
			status: "off",
		},
	},
);

export interface ChipProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof chipVariants> {
	children: React.ReactNode;
}

const Chip = ({ className, status, children, ...props }: ChipProps) => {
	return (
		<button
			type="button"
			className={cn(chipVariants({ status }), className)}
			{...props}
		>
			{children}
		</button>
	);
};

export default Chip;
