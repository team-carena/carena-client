import { cn } from "@shared/libs/cn";
import { useCallback, useEffect, useRef, useState } from "react";
import { Drawer } from "vaul";

type BottomSheetSnapPoints = {
	// 접힌 상태 높이 (467px)
	collapsed: string;
	// 펼친 상태 높이 (calc(100dvh - 40px)
	expanded: string;
};

export type BottomSheetProps = {
	open: boolean;
	onClose: () => void;
	children: React.ReactNode;
	/**
	 * 바텀시트 collapsed/expanded 모드
	 * 생략 시 `height` prop으로 고정 높이 모드 사용.
	 */
	snapPoints?: BottomSheetSnapPoints;
	// 고정 높이 모드 사용 시 height 전달. snapPoints가 있으면 무시됨.
	height?: string;
	// backdrop 클릭으로 닫기 허용 여부. 기본값: true
	dismissible?: boolean;
	className?: string;
	// 스크롤 영역 밖 하단 고정 CTA 버튼 영역
	footer?: React.ReactNode;
};

export const BottomSheet = ({
	open,
	onClose,
	children,
	snapPoints,
	height,
	dismissible = true,
	className,
	footer,
}: BottomSheetProps) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const [isDragging, setIsDragging] = useState(false);
	const [dragHeight, setDragHeight] = useState<number | null>(null);

	const dragStartY = useRef(0);
	const startHeight = useRef(0);
	const collapsedPx = useRef(0);
	const expandedPx = useRef(0);
	const contentRef = useRef<HTMLDivElement>(null);

	// 열릴 때마다 collapsed로 리셋
	useEffect(() => {
		if (open) {
			setIsExpanded(false);
			setDragHeight(null);
		}
	}, [open]);

	// snap point가 아닌 경우의 높이 (고정 높이 모드)
	const snapHeight = snapPoints
		? isExpanded
			? snapPoints.expanded
			: snapPoints.collapsed
		: height;

	// 드래그 핸들러로 드래그 중이면 px 값, 아니면 CSS 문자열 값
	const currentHeight =
		isDragging && dragHeight != null ? `${dragHeight}px` : snapHeight;

	// 확장 상태에서는 vaul의 드래그 닫기를 차단해 collapsed 높이에서 멈추도록 함
	const effectiveDismissible = snapPoints && isExpanded ? false : dismissible;

	// calc() 등 CSS 함수 값은 JS만으로 px 변환이 불가하므로, 임시 DOM 요소에 적용하여 계산된 높이를 읽음
	const resolvePx = useCallback((cssValue: string): number => {
		if (cssValue.endsWith("px")) return Number.parseInt(cssValue, 10);
		const el = document.createElement("div");
		el.style.position = "fixed";
		el.style.height = cssValue;
		el.style.visibility = "hidden";
		document.body.appendChild(el);
		const px = el.offsetHeight;
		document.body.removeChild(el);
		return px;
	}, []);

	const handlePointerDown = useCallback(
		(e: React.PointerEvent) => {
			if (!snapPoints || !contentRef.current) return;

			dragStartY.current = e.clientY;
			startHeight.current = contentRef.current.offsetHeight;
			collapsedPx.current = resolvePx(snapPoints.collapsed);
			expandedPx.current = resolvePx(snapPoints.expanded);

			setIsDragging(true);
			setDragHeight(startHeight.current);
			(e.target as HTMLElement).setPointerCapture(e.pointerId);
		},
		[snapPoints, resolvePx],
	);

	// 바텀시트 애니메이션 개선용 (collapsed ↔ expanded 애니메이션 개선)
	const handlePointerMove = useCallback(
		(e: React.PointerEvent) => {
			if (!isDragging) return;

			const deltaY = dragStartY.current - e.clientY;
			const newHeight = startHeight.current + deltaY;
			const clamped = Math.max(
				collapsedPx.current,
				Math.min(expandedPx.current, newHeight),
			);
			setDragHeight(clamped);
		},
		[isDragging],
	);

	const handlePointerUp = useCallback(
		(e: React.PointerEvent) => {
			if (!isDragging || dragHeight == null) return;

			(e.target as HTMLElement).releasePointerCapture(e.pointerId);
			setIsDragging(false);

			const midPoint = (collapsedPx.current + expandedPx.current) / 2;

			if (dragHeight > midPoint) {
				setIsExpanded(true);
			} else if (
				!isExpanded &&
				dragHeight <= collapsedPx.current &&
				dismissible
			) {
				// collapsed 아래로 드래그 시도 → 닫기 (clamp 때문에 실제로는 collapsed에서 멈춤)
				const dragDelta = dragStartY.current - e.clientY;
				if (dragDelta < -30) {
					setDragHeight(null);
					onClose();
					return;
				}
				setIsExpanded(false);
			} else {
				setIsExpanded(false);
			}

			setDragHeight(null);
		},
		[isDragging, dragHeight, isExpanded, dismissible, onClose],
	);

	return (
		<Drawer.Root
			open={open}
			onOpenChange={(isOpen) => {
				if (!isOpen) onClose();
			}}
			dismissible={effectiveDismissible}
			modal
		>
			<Drawer.Portal>
				<Drawer.Overlay className="fixed inset-0 z-50 bg-black/20" />

				<Drawer.Content
					ref={contentRef}
					style={{ height: currentHeight }}
					className={cn(
						"fixed inset-x-0 bottom-0 z-50 mx-auto flex max-w-[var(--app-max-width)] flex-col rounded-t-[20px] bg-white",
						!isDragging && "transition-[height] duration-[350ms] ease-in-out",
						className,
					)}
					aria-describedby={undefined}
				>
					<Drawer.Title className="sr-only">바텀시트</Drawer.Title>

					{/* 드래그 핸들 */}
					<div
						onPointerDown={handlePointerDown}
						onPointerMove={handlePointerMove}
						onPointerUp={handlePointerUp}
						className="flex shrink-0 cursor-grab justify-center pt-[1.2rem] pb-[2rem]"
						style={{ touchAction: "none" }}
					>
						<div className="h-[0.5rem] w-[3rem] rounded-full bg-gray-300" />
					</div>

					{/* 스크롤 가능한 컨텐츠 영역 */}
					<div
						className="bottom-sheets-scrollbar min-h-0 flex-1 overflow-y-auto px-[2rem]"
						style={{ touchAction: "pan-y" }}
					>
						{children}
					</div>

					{/* 하단 고정 CTA 영역 */}
					{footer && (
						<div className="flex shrink-0 flex-col gap-[0.4rem] px-[2rem] pt-[2rem] pb-[1.2rem]">
							{footer}
						</div>
					)}
				</Drawer.Content>
			</Drawer.Portal>
		</Drawer.Root>
	);
};
