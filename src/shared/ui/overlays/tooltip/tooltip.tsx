import * as React from "react";

import { InfoBlack, InfoGray } from "@/shared/assets/svg";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

interface TooltipProps {
	children: React.ReactNode;
	side?: "top" | "bottom" | "left" | "right"; // PopoverTrigger를 기준으로 한 popover의 위치
	align?: "start" | "center" | "end"; // 삼각형 위치
	iconTone?: "gray" | "black";
	avoidCollisions?: boolean;
	className?: string;
}

function Tooltip({
	children,
	side = "top",
	align = "start",
	iconTone = "gray",
	avoidCollisions = true,
	className,
}: TooltipProps) {
	// 툴팁 UI의 삼각형 중앙이 info 아이콘 중앙을 가리키도록 offset 조정
	const ALIGN_OFFSET = -25;
	const [open, setOpen] = React.useState(false);
	//스크롤 시 툴팁 닫기
	React.useEffect(() => {
		if (!open) return undefined;
		const handleScroll = () => setOpen(false);

		window.addEventListener("scroll", handleScroll, {
			capture: true,
			passive: true,
		});
		window.addEventListener("touchmove", handleScroll, {
			capture: true,
			passive: true,
		});

		return () => {
			window.removeEventListener("scroll", handleScroll, { capture: true });
			window.removeEventListener("touchmove", handleScroll, { capture: true });
		};
	}, [open]);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<button
					type="button"
					className="inline-flex outline-none focus:outline-none focus-visible:outline-none"
					style={{ WebkitTapHighlightColor: "transparent" }}
					aria-label="정보 보기"
				>
					{iconTone === "black" ? <InfoBlack /> : <InfoGray />}
				</button>
			</PopoverTrigger>
			<PopoverContent
				side={side}
				align={align}
				alignOffset={ALIGN_OFFSET}
				avoidCollisions={avoidCollisions}
				className={className}
			>
				{children}
			</PopoverContent>
		</Popover>
	);
}

export { Tooltip };
