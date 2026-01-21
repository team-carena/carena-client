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
	/** 스크롤이 끝에 도달했을 때 호출되는 콜백 (size="lg"일 때만 동작) */
	onScrollEnd?: () => void;
};

export const Modal = ({
	open,
	title,
	description,
	primaryAction,
	secondaryAction,
	size = "lg",
	onScrollEnd,
}: ModalProps) => {
	const endMarkerRef = React.useRef<HTMLDivElement>(null);
	const previousActiveElement = React.useRef<Element | null>(null);

	React.useEffect(() => {
		if (open) {
			// 모달 열릴 때 현재 포커스된 요소 저장
			previousActiveElement.current = document.activeElement;
			const originalOverflow = document.body.style.overflow;
			document.body.style.overflow = "hidden";

			return () => {
				document.body.style.overflow = originalOverflow;
				// 모달 닫힐 때 이전 요소로 포커스 복원
				if (previousActiveElement.current instanceof HTMLElement) {
					previousActiveElement.current.focus();
				}
			};
		}
	}, [open]);

	// 컨텐츠 끝이 화면에 보이는지 감지
	React.useEffect(() => {
		if (!open || !onScrollEnd || !endMarkerRef.current) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					onScrollEnd();
				}
			},
			{ threshold: 1.0 },
		);

		observer.observe(endMarkerRef.current);

		return () => observer.disconnect();
	}, [open, onScrollEnd]);

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
					size === "sm" ? "w-[28rem]" : "max-h-[62rem] w-[31.1rem]",
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
						{size === "lg" && onScrollEnd && (
							<div
								ref={endMarkerRef}
								className="h-[1px] w-full"
								aria-hidden="true"
							/>
						)}
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
