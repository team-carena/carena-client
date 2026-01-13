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
	sideOffset = 8,
	...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
	return (
		<PopoverPrimitive.Portal>
			<PopoverPrimitive.Content
				data-slot="popover-content"
				align={align} //
				sideOffset={sideOffset}
				className={cn(
					"z-50 w-[25.6rem] rounded-[12px] border border-gray-300 bg-white p-[2.4rem] body05-r-12 text-gray-900",
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
				<PopoverPrimitive.Arrow className="fill-white stroke-gray-200" />
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
