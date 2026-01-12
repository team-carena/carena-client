import { Plus } from "@/shared/assets/svg";
import { cn } from "@/shared/libs/cn";

interface AddButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const AddButton = ({ onClick, className, ...props }: AddButtonProps) => {
	return (
		<button
			onClick={onClick}
			{...props}
			className={cn(
				"flex px-[0.8rem] py-[0.4rem] items-center justify-center gap-[0.4rem] rounded-[0.4rem] bg-white active:bg-gray-200",
				className,
			)}
		>
			<p className="label06-r-12 text-gray-900">검진결과추가</p>
			<Plus />
		</button>
	);
};
