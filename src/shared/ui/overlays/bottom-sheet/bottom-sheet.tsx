import { cn } from "@shared/libs/cn";
import { useEffect, useState } from "react";
import { Drawer } from "vaul";

type BottomSheetSnapPoints = {
	/** 접힌 상태 높이 (e.g. "467px") */
	collapsed: string;
	/** 펼친 상태 높이 (e.g. "779px") */
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

export const BottomSheet = ({
	open,
	onClose,
	children,
	snapPoints,
	height,
	dismissible = false,
	className,
	footer,
}: BottomSheetProps) => {
	const collapsedPoint = snapPoints?.collapsed;
	const expandedPoint = snapPoints?.expanded;

	const vaulSnapPoints =
		collapsedPoint && expandedPoint
			? [collapsedPoint, expandedPoint]
			: height
				? [height]
				: undefined;

	const [snap, setSnap] = useState<number | string | null>(
		collapsedPoint ?? null,
	);

	useEffect(() => {
		if (open && collapsedPoint) {
			setSnap(collapsedPoint);
		}
	}, [open, collapsedPoint]);

	const isExpanded = expandedPoint ? snap === expandedPoint : true;

	// vaul의 discriminated union 타입: snapPoints가 있으면 fadeFromIndex 필수
	const snapPointsProps = vaulSnapPoints
		? { snapPoints: vaulSnapPoints, fadeFromIndex: 0 }
		: {};

	return (
		<Drawer.Root
			open={open}
			onOpenChange={(isOpen) => {
				if (!isOpen) onClose();
			}}
			{...snapPointsProps}
			activeSnapPoint={snap}
			setActiveSnapPoint={setSnap}
			dismissible={dismissible}
			modal
		>
			<Drawer.Portal>
				<Drawer.Overlay className="fixed inset-0 z-50 bg-black/20" />

				<Drawer.Content
					className={cn(
						"fixed inset-x-0 bottom-0 z-50 mx-auto flex max-h-[calc(100dvh-33px)] max-w-[var(--app-max-width)] flex-col rounded-t-[20px] bg-white",
						className,
					)}
					aria-describedby={undefined}
				>
					{/* 드래그 핸들 */}
					<div className="flex shrink-0 justify-center pt-[1.2rem] pb-[1.6rem]">
						<div className="h-[0.5rem] w-[3rem] rounded-full bg-gray-300" />
					</div>

					{/* 스크롤 가능한 컨텐츠 영역 */}
					<div
						className={cn(
							"min-h-0 flex-1 px-[2rem]",
							isExpanded ? "overflow-y-auto" : "overflow-hidden",
						)}
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
