import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/libs/cn";

const chipVariants = cva(
	"inline-flex items-center justify-center px-[1.6rem] py-[0.8rem] w-fit rounded-full border label05-r-14",
	{
		variants: {
			status: {
				on: "bg-primary-50 border-primary-500 text-primary-500",
				off: "bg-white border-gray-300 text-gray-900",
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
