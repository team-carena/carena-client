import { cn } from "@shared/libs/cn";
import { useCallback, useEffect, useRef, useState } from "react";
import { Drawer } from "vaul";

type BottomSheetSnapPoints = {
	/** 접힌 상태 높이 (e.g. "467px") */
	collapsed: string;
	/** 펼친 상태 높이 (e.g. "calc(100dvh - 33px)") */
	expanded: string;
};

export type BottomSheetProps = {
	open: boolean;
	onClose: () => void;
	children: React.ReactNode;
	/**
	 * 확장 가능 모드의 snap points.
	 * 생략 시 `height` prop으로 고정 높이 모드 사용.
	 */
	snapPoints?: BottomSheetSnapPoints;
	/** 고정 높이 모드 (e.g. "500px"). snapPoints가 있으면 무시됨. */
	height?: string;
	/** backdrop 클릭으로 닫기 허용 여부. 기본값: true */
	dismissible?: boolean;
	className?: string;
	/** 스크롤 영역 밖 하단 고정 CTA 영역 */
	footer?: React.ReactNode;
};

const SWIPE_THRESHOLD = 30;

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
	const dragStartY = useRef(0);

	// 열릴 때마다 collapsed로 리셋
	useEffect(() => {
		if (open) setIsExpanded(false);
	}, [open]);

	// 현재 높이 결정
	const currentHeight = snapPoints
		? isExpanded
			? snapPoints.expanded
			: snapPoints.collapsed
		: height;

	// 드래그 핸들 스와이프 감지
	const handlePointerDown = useCallback((e: React.PointerEvent) => {
		dragStartY.current = e.clientY;
	}, []);

	const handlePointerUp = useCallback(
		(e: React.PointerEvent) => {
			const deltaY = dragStartY.current - e.clientY;

			if (deltaY > SWIPE_THRESHOLD) {
				// 위로 스와이프 → 확장
				setIsExpanded(true);
			} else if (deltaY < -SWIPE_THRESHOLD) {
				// 아래로 스와이프 → 축소 또는 닫기
				if (isExpanded) {
					setIsExpanded(false);
				} else if (dismissible) {
					onClose();
				}
			}
		},
		[isExpanded, dismissible, onClose],
	);

	return (
		<Drawer.Root
			open={open}
			onOpenChange={(isOpen) => {
				if (!isOpen) onClose();
			}}
			dismissible={dismissible}
			modal
		>
			<Drawer.Portal>
				<Drawer.Overlay className="fixed inset-0 z-50 bg-black/20" />

				<Drawer.Content
					style={{ height: currentHeight }}
					className={cn(
						"fixed inset-x-0 bottom-0 z-50 mx-auto flex max-w-[var(--app-max-width)] flex-col rounded-t-[20px] bg-white transition-[height] duration-300 ease-out",
						className,
					)}
					aria-describedby={undefined}
				>
					{/* 드래그 핸들 */}
					<div
						onPointerDown={handlePointerDown}
						onPointerUp={handlePointerUp}
						className="flex shrink-0 cursor-grab justify-center pt-[1.2rem] pb-[1.6rem]"
						style={{ touchAction: "none" }}
					>
						<div className="h-[0.5rem] w-[3rem] rounded-full bg-gray-300" />
					</div>

					{/* 스크롤 가능한 컨텐츠 영역 */}
					<div
						className="min-h-0 flex-1 overflow-y-auto px-[2rem]"
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
