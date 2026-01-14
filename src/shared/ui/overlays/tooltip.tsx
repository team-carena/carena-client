import * as PopoverPrimitive from "@radix-ui/react-popover";
import type * as React from "react";

import { InfoGray } from "@/shared/assets/svg";
import { cn } from "@/shared/libs/cn";

function Popover({
	...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
	return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}

function PopoverTrigger({
	...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
	return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

function PopoverContent({
	className,
	align = "center", // 삼각형 위치 (start, center, end)
	sideOffset = 14, // PopoverTrigger(여기서는 info 아이콘)으로부터 얼마나 떨어져있는가
	...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
	return (
		<PopoverPrimitive.Portal>
			<PopoverPrimitive.Content
				data-slot="popover-content"
				align={align}
				sideOffset={sideOffset}
				className={cn(
					// Popover 내용을 나타내는 영역의 css
					"group z-50 w-[25.6rem] rounded-[12px] border border-gray-300 bg-white p-[2.4rem] body05-r-12 text-gray-900 whitespace-pre-wrap",
					// Popover가 열리고 닫힐 때의 애니메이션 (tw-animate-css 패키지가 제공, popover 기본제공 코드)
					"data-[state=open]:animate-in data-[state=closed]:animate-out",
					"data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
					"data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
					"data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
					"data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
					className,
				)}
				{...props}
			>
				{props.children}

				{/* 삼각형의 border용 (Popover 테두리와 같은 색, 테두리와 연결되는 외곽선 역할) */}
				<span
					className={cn(
						"absolute w-0 h-0",
						// side=top: 삼각형이 아래쪽에 위치 (가로 22px, 세로 12px)
						"group-data-[side=top]:bottom-[-12px] group-data-[side=top]:left-[24px]",
						"group-data-[side=top]:border-l-[11px] group-data-[side=top]:border-r-[11px] group-data-[side=top]:border-t-[12px]",
						"group-data-[side=top]:border-l-transparent group-data-[side=top]:border-r-transparent group-data-[side=top]:border-t-gray-300",
						// side=bottom: 삼각형이 위쪽에 위치
						"group-data-[side=bottom]:top-[-12px] group-data-[side=bottom]:left-[24px]",
						"group-data-[side=bottom]:border-l-[11px] group-data-[side=bottom]:border-r-[11px] group-data-[side=bottom]:border-b-[12px]",
						"group-data-[side=bottom]:border-l-transparent group-data-[side=bottom]:border-r-transparent group-data-[side=bottom]:border-b-gray-300",
						// side=left: 삼각형이 오른쪽에 위치 (가로 12px, 세로 22px)
						"group-data-[side=left]:right-[-12px] group-data-[side=left]:top-[24px]",
						"group-data-[side=left]:border-t-[11px] group-data-[side=left]:border-b-[11px] group-data-[side=left]:border-l-[12px]",
						"group-data-[side=left]:border-t-transparent group-data-[side=left]:border-b-transparent group-data-[side=left]:border-l-gray-300",
						// side=right: 삼각형이 왼쪽에 위치
						"group-data-[side=right]:left-[-12px] group-data-[side=right]:top-[24px]",
						"group-data-[side=right]:border-t-[11px] group-data-[side=right]:border-b-[11px] group-data-[side=right]:border-r-[12px]",
						"group-data-[side=right]:border-t-transparent group-data-[side=right]:border-b-transparent group-data-[side=right]:border-r-gray-300",
					)}
				/>
				{/* 삼각형의 배경용 (흰색, Popover와 회색 삼각형 사이의 경계선을 덮어서 자연스럽게 연결) */}
				<span
					className={cn(
						"absolute w-0 h-0",
						// side=top: 테두리 삼각형보다 1px 안쪽에서 시작 (bottom: -12px + 1px = -11px)
						"group-data-[side=top]:bottom-[-11px] group-data-[side=top]:left-[25px]",
						"group-data-[side=top]:border-l-[10px] group-data-[side=top]:border-r-[10px] group-data-[side=top]:border-t-[12px]",
						"group-data-[side=top]:border-l-transparent group-data-[side=top]:border-r-transparent group-data-[side=top]:border-t-white",
						// side=bottom
						"group-data-[side=bottom]:top-[-11px] group-data-[side=bottom]:left-[25px]",
						"group-data-[side=bottom]:border-l-[10px] group-data-[side=bottom]:border-r-[10px] group-data-[side=bottom]:border-b-[12px]",
						"group-data-[side=bottom]:border-l-transparent group-data-[side=bottom]:border-r-transparent group-data-[side=bottom]:border-b-white",
						// side=left
						"group-data-[side=left]:right-[-11px] group-data-[side=left]:top-[25px]",
						"group-data-[side=left]:border-t-[10px] group-data-[side=left]:border-b-[10px] group-data-[side=left]:border-l-[12px]",
						"group-data-[side=left]:border-t-transparent group-data-[side=left]:border-b-transparent group-data-[side=left]:border-l-white",
						// side=right
						"group-data-[side=right]:left-[-11px] group-data-[side=right]:top-[25px]",
						"group-data-[side=right]:border-t-[10px] group-data-[side=right]:border-b-[10px] group-data-[side=right]:border-r-[12px]",
						"group-data-[side=right]:border-t-transparent group-data-[side=right]:border-b-transparent group-data-[side=right]:border-r-white",
					)}
				/>
			</PopoverPrimitive.Content>
		</PopoverPrimitive.Portal>
	);
}

function PopoverAnchor({
	...props
}: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
	return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />;
}

// 이 아래로는 별도로 추가한 코드
// Tooltip: info-gray 아이콘을 트리거로 사용하는 툴팁
type TooltipProps = {
	children: React.ReactNode;
	side?: "top" | "bottom" | "left" | "right"; // PopoverTrigger를 기준으로 한 popover의 위치
	align?: "start" | "center" | "end"; // 삼각형 위치
	className?: string;
};

function Tooltip({
	children,
	side = "top",
	align = "start",
	className,
}: TooltipProps) {
	const ALIGH_OFFSET = -25;

	return (
		<Popover>
			<PopoverTrigger asChild>
				<button type="button" className="inline-flex" aria-label="정보 보기">
					<InfoGray />
				</button>
			</PopoverTrigger>
			<PopoverContent
				side={side}
				align={align}
				alignOffset={ALIGH_OFFSET} // 삼각형이 아이콘 정중앙을 가리키도록 조절 (기본값 있으므로 값 전달 불필요)
				className={className}
			>
				{children}
			</PopoverContent>
		</Popover>
	);
}

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor, Tooltip };
