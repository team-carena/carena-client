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
	onClose,
}: ModalProps) => {
	React.useEffect(() => {
		if (!open) {
			return undefined;
		}

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				onClose?.();
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [open, onClose]);

	return (
		<div
			className={cn(
				"fixed inset-0 z-50 flex items-center justify-center p-[1.5rem]",
				open ? "pointer-events-auto" : "pointer-events-none",
			)}
			aria-hidden={!open}
		>
			<button
				type="button"
				aria-label="Close modal"
				className={cn(
					"absolute inset-0 bg-black/40 transition-opacity duration-200",
					open ? "opacity-100" : "opacity-0",
				)}
				onClick={onClose}
			/>
			<div
				role="dialog"
				aria-modal="true"
				className={cn(
					"relative flex w-full flex-col overflow-hidden rounded-[12px] border border-gray-200 bg-white text-gray-900 shadow-lg transition-all duration-200",
					size === "sm"
						? "h-[16rem] max-w-[28rem]"
						: "h-[19rem] max-w-[31.1rem]",
					open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
				)}
			>
				{(() => {
					const hasTitle = size === "lg" && Boolean(title);

					return (
						<div
							className={cn(
								"p-[2.4rem] flex flex-1 flex-col justify-center",
								hasTitle ? "text-left" : "text-center",
							)}
						>
							{hasTitle ? (
								<div className="label01-sb-14 text-center text-gray-900">
									{title}
								</div>
							) : null}
							<div
								className={cn(
									"body04-r-14 whitespace-pre-line text-gray-900",
									hasTitle ? "mt-[2rem]" : undefined,
									hasTitle ? "text-left" : "text-center",
								)}
							>
								{description}
							</div>
						</div>
					);
				})()}
				<div
					className={cn(
						"border-t border-gray-200",
						secondaryAction ? "grid grid-cols-2" : "grid grid-cols-1",
					)}
				>
					{secondaryAction ? (
						<button
							type="button"
							className="label01-sb-14 w-full whitespace-nowrap rounded-none border-0 bg-white px-[3rem] py-[2.1rem] text-gray-900"
							onClick={secondaryAction.onClick}
						>
							{secondaryAction.label}
						</button>
					) : null}
					<button
						type="button"
						className={cn(
							"label01-sb-14 w-full whitespace-nowrap rounded-none border-0 bg-white px-[3rem] py-[2.1rem] text-primary-500",
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
