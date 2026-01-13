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
	align = "center",
	sideOffset = 12,
	...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
	return (
		<PopoverPrimitive.Portal>
			<PopoverPrimitive.Content
				data-slot="popover-content"
				align={align}
				sideOffset={sideOffset}
				className={cn(
					"group z-50 w-[25.6rem] rounded-[12px] border border-gray-300 bg-white p-[2.4rem] body05-r-12 text-gray-900",
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
				{/* 삼각형 - border용 (뒤, 더 큰 삼각형) */}
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
				{/* 삼각형 - 배경용 (앞, 더 작은 삼각형으로 테두리 두께 표현) */}
				<span
					className={cn(
						"absolute w-0 h-0",
						// side=top
						"group-data-[side=top]:bottom-[-11px] group-data-[side=top]:left-[25px]",
						"group-data-[side=top]:border-l-[10px] group-data-[side=top]:border-r-[10px] group-data-[side=top]:border-t-[11px]",
						"group-data-[side=top]:border-l-transparent group-data-[side=top]:border-r-transparent group-data-[side=top]:border-t-white",
						// side=bottom
						"group-data-[side=bottom]:top-[-11px] group-data-[side=bottom]:left-[25px]",
						"group-data-[side=bottom]:border-l-[10px] group-data-[side=bottom]:border-r-[10px] group-data-[side=bottom]:border-b-[11px]",
						"group-data-[side=bottom]:border-l-transparent group-data-[side=bottom]:border-r-transparent group-data-[side=bottom]:border-b-white",
						// side=left
						"group-data-[side=left]:right-[-11px] group-data-[side=left]:top-[25px]",
						"group-data-[side=left]:border-t-[10px] group-data-[side=left]:border-b-[10px] group-data-[side=left]:border-l-[11px]",
						"group-data-[side=left]:border-t-transparent group-data-[side=left]:border-b-transparent group-data-[side=left]:border-l-white",
						// side=right
						"group-data-[side=right]:left-[-11px] group-data-[side=right]:top-[25px]",
						"group-data-[side=right]:border-t-[10px] group-data-[side=right]:border-b-[10px] group-data-[side=right]:border-r-[11px]",
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
// InfoTooltip: info-gray 아이콘을 트리거로 사용하는 툴팁
type InfoTooltipProps = {
	children: React.ReactNode;
	side?: "top" | "bottom" | "left" | "right";
	align?: "start" | "center" | "end";
	className?: string;
};

function InfoTooltip({
	children,
	side = "top",
	align = "center",
	className,
}: InfoTooltipProps) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<button type="button" className="inline-flex" aria-label="정보 보기">
					<InfoGray />
				</button>
			</PopoverTrigger>
			{/* PopoverContent: Popover 컴포넌트 UI */}
			<PopoverContent side={side} align={align} className={className}>
				{children}
			</PopoverContent>
		</Popover>
	);
}

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor, InfoTooltip };
