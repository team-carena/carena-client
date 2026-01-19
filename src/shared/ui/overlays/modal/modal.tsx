import { cn } from "@shared/libs/cn";
import * as React from "react";

type ModalAction = {
	label: string;
	onClick: () => void;
};

type ModalSize = "sm" | "lg";

export type ModalProps = {
	open: boolean;
	title?: React.ReactNode;
	description: React.ReactNode;
	primaryAction: ModalAction;
	secondaryAction?: ModalAction;
	size?: ModalSize;
	onClose?: () => void;
};

export const Modal = ({
	open,
	title,
	description,
	primaryAction,
	secondaryAction,
	size = "lg",
}: ModalProps) => {
	React.useEffect(() => {
		if (open) {
			const originalOverflow = document.body.style.overflow;
			document.body.style.overflow = "hidden";

			return () => {
				document.body.style.overflow = originalOverflow;
			};
		}
	}, [open]);

	const hasTitle = Boolean(title);

	return (
		<div
			className={cn(
				"fixed inset-0 z-50 flex items-center justify-center p-[1.5rem]",
				open ? "pointer-events-auto" : "pointer-events-none",
			)}
			aria-hidden={!open}
		>
			<div
				aria-hidden="true"
				className={cn(
					"absolute inset-0 bg-black-30 transition-opacity duration-200",
					open ? "opacity-100" : "opacity-0",
				)}
			/>
			<div
				role="dialog"
				aria-modal="true"
				className={cn(
					"relative flex w-full flex-col rounded-[12px] border border-gray-200 bg-white text-gray-900 transition-opacity duration-200",
					size === "sm" ? "w-[28rem]" : "max-h-[61rem] w-[31.1rem]",
					open ? "opacity-100" : "opacity-0",
				)}
			>
				<div
					className={cn(
						"flex flex-col gap-[2rem] p-[2.4rem]",
						size === "lg" && "min-h-0 flex-1",
					)}
				>
					{hasTitle && (
						<div className="label01-sb-14 text-center text-gray-900">
							{title}
						</div>
					)}
					<div
						className={cn(
							"body04-r-14 text-gray-900",
							size === "sm"
								? "flex h-[5.2rem] items-center justify-center text-center"
								: "min-h-0 flex-1 overflow-y-auto whitespace-pre-wrap",
						)}
					>
						{description}
					</div>
				</div>
				<div
					className={cn(
						"label01-sb-14 rounded-b-[12px] border-gray-200 border-t text-gray-900",
						secondaryAction ? "grid grid-cols-2" : "grid grid-cols-1",
					)}
				>
					{secondaryAction ? (
						<button
							type="button"
							className="py-[2.1rem]"
							onClick={secondaryAction.onClick}
						>
							{secondaryAction.label}
						</button>
					) : null}
					<button
						type="button"
						className={cn(
							"py-[2.1rem] text-primary-500",
							secondaryAction ? "border-l border-l-gray-200" : undefined,
						)}
						onClick={primaryAction.onClick}
					>
						{primaryAction.label}
					</button>
				</div>
			</div>
		</div>
	);
};
