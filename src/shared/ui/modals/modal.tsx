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

	const hasTitle = Boolean(title);

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
					"absolute inset-0 bg-black-30 transition-opacity duration-200",
					open ? "opacity-100" : "opacity-0",
				)}
				onClick={onClose}
			/>
			<div
				role="dialog"
				aria-modal="true"
				className={cn(
					"relative flex w-full flex-col border border-gray-200 rounded-[12px] bg-white text-gray-900 transition-opacity duration-200",
					size === "sm" ? "w-[28rem]" : "w-[31.1rem] max-h-[61rem]",
					open ? "opacity-100" : "opacity-0",
				)}
			>
				<div
					className={cn(
						"p-[2.4rem] flex flex-col gap-[2rem]",
						size === "lg" && "flex-1 min-h-0 overflow-hidden",
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
								? "h-[5.2rem] flex items-center justify-center text-center"
								: "whitespace-pre-wrap overflow-y-auto flex-1 min-h-0",
						)}
					>
						{description}
					</div>
				</div>
				<div
					className={cn(
						"rounded-b-[12px] border-t border-gray-200 label01-sb-14 text-gray-900",
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
