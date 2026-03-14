import { cn } from "@/shared/libs/cn";
import { SectionHeader } from "./section-header";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
	title: string;
	icon?: boolean;
	onHeaderClick?: () => void;
}

export function InputField({
	title,
	icon,
	className,
	onHeaderClick,
	...props
}: InputFieldProps) {
	const headerAs = icon ? undefined : "h2";
	return (
		<section className="flex flex-col gap-[0.8rem]">
			<SectionHeader
				onClick={onHeaderClick}
				as={headerAs}
				title={title}
				icon={icon}
			/>

			<input
				className={cn(
					`label04-r-16 w-full rounded-[0.8rem] border px-[1.6rem] py-[0.8rem] placeholder-gray-500 outline-none focus:outline-none focus:ring-0`,
					props.value ? "border-gray-500" : "border-gray-200",
					className,
				)}
				{...props}
			/>
		</section>
	);
}
