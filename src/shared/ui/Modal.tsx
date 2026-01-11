import { cn } from "@shared/libs/cn";
import { Button, type ButtonProps } from "@shared/ui/Button";
import * as React from "react";

type ModalAction = {
	label: string;
	onClick: () => void;
	variant?: ButtonProps["variant"];
};

type ModalSize = "sm" | "lg";

export type ModalProps = {
	open: boolean;
	title?: React.ReactNode;
	description?: React.ReactNode;
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
				<div
					className={cn(
						"p-[2.4rem]",
						size === "lg" ? "text-left" : "text-center",
					)}
				>
					{size === "lg" && title ? (
						<div className="text-center text-lg font-semibold leading-[1.4]">
							{title}
						</div>
					) : null}
					{description ? (
						<div
							className={cn(
								"whitespace-pre-line text-sm font-normal leading-[1.4] text-gray-900",
								size === "lg" && title ? "mt-[2rem]" : undefined,
								size === "lg" ? "text-left" : "text-center",
							)}
						>
							{description}
						</div>
					) : null}
				</div>
				<div
					className={cn(
						"mt-auto border-t border-gray-200",
						secondaryAction ? "grid grid-cols-2" : "grid grid-cols-1",
					)}
				>
					{secondaryAction ? (
						<Button
							variant={secondaryAction.variant ?? "outline"}
							className="h-[6.2rem] w-full whitespace-nowrap rounded-none border-0 bg-white px-[3rem] py-[2.1rem] text-sm font-semibold leading-[1.4] text-gray-900"
							onClick={secondaryAction.onClick}
						>
							{secondaryAction.label}
						</Button>
					) : null}
					<Button
						variant={primaryAction.variant ?? "outline"}
						className={cn(
							"h-[6.2rem] w-full whitespace-nowrap rounded-none border-0 bg-white px-[3rem] py-[2.1rem] text-sm font-semibold leading-[1.4] text-primary-500",
							secondaryAction ? "border-l border-l-gray-200" : undefined,
						)}
						onClick={primaryAction.onClick}
					>
						{primaryAction.label}
					</Button>
				</div>
			</div>
		</div>
	);
};
