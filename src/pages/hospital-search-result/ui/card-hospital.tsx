import { cn } from "@/shared/libs/cn";
import Tag from "@/shared/ui/tags/tag";

export interface CardHospitalProps
	extends React.HTMLAttributes<HTMLDivElement> {
	hospitalName: string;
	address: string;
	checkupItems: string[];
	onCopyAddress?: () => void;
}

const CardHospital = ({
	className,
	hospitalName,
	address,
	checkupItems,
	onCopyAddress,
	...props
}: CardHospitalProps) => {
	return (
		<div
			className={cn(
				"flex w-full flex-col gap-[1.2rem] bg-white px-[2rem] py-[1.2rem]",
				className,
			)}
			{...props}
		>
			<h3 className="head01-b-18 truncate text-gray-900">{hospitalName}</h3>

			<div className="flex items-center gap-[0.8rem]">
				<p className="body05-r-12 line-clamp-2 min-w-0 flex-1 break-keep text-gray-900">
					{address}
				</p>

				<button
					type="button"
					className="body06-r-10 shrink-0 p-[0.4rem] text-gray-700 underline underline-offset-[0.2rem]"
					onClick={onCopyAddress}
				>
					주소복사
				</button>
			</div>

			<div className="flex items-center gap-[0.8rem]">
				<Tag className="body06-r-10 shrink-0">검진항목</Tag>

				<p className="body05-r-12 text-gray-900">{checkupItems.join(", ")}</p>
			</div>
		</div>
	);
};

export { CardHospital };
