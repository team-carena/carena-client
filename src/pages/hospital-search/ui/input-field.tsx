import { cn } from "@/shared/libs/cn";
import { SectionHeader } from "./section-header";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
	title: string;
	icon?: boolean;
}

export function InputField({
	title,
	icon,
	className,
	...props
}: InputFieldProps) {
	const headerAs = icon ? undefined : "h2";
	return (
		<section className="flex flex-col gap-[0.8rem]">
			<SectionHeader as={headerAs} title={title} icon={icon} />

			<input
				className={cn(
					`label04-r-16 w-full rounded-[0.8rem] border border-gray-200 px-[1.6rem] py-[0.8rem] placeholder-gray-500 outline-none focus:outline-none focus:ring-0`,
					className,
				)}
				{...props}
			/>
		</section>
	);
}
