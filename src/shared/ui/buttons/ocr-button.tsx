import { Scan } from "@/shared/assets/svg";
import { cn } from "@/shared/libs/cn";

interface OcrButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const OcrButton = ({ onClick, className, ...props }: OcrButtonProps) => {
	return (
		<button
			type="button"
			onClick={onClick}
			{...props}
			className={cn(
				"flex w-[23.6rem] px-[1.6rem] py-[1.2rem] items-center justify-center gap-[1.2rem] rounded-[8px] border border-primary-600 bg-primary-50 active:bg-primary-100",
				className,
			)}
		>
			<Scan />
			<span className="label03-m-12 text-primary-600">
				검진 결과지 스캔하고 자동 입력받기
			</span>
		</button>
	);
};
