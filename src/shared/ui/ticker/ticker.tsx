import { useEffect, useState } from "react";
import { cn } from "@/shared/libs/cn";

interface Tips {
	id: number;
	title: string;
} // TODO: 건강 팁 api 응답 타입을 export 해오기

interface TickerProps {
	tips: Tips[];
}

export const Ticker = ({ tips }: TickerProps) => {
	const [visibleIndex, setVisibleIndex] = useState(0);
	const [isTransitionEnabled, setIsTransitionEnabled] = useState(false);

	const extendedTips = [...tips, tips[0]];
	const ITEM_HEIGHT = 35;

	useEffect(() => {
		const autoScrollInterval = setInterval(() => {
			setIsTransitionEnabled(true);
			setVisibleIndex((prev) => prev + 1);
		}, 3000);

		return () => clearInterval(autoScrollInterval);
	}, []);

	useEffect(() => {
		if (visibleIndex === tips.length) {
			const resetIndexTimeout = setTimeout(() => {
				setIsTransitionEnabled(false);
				setVisibleIndex(0);
			}, 400);

			return () => clearTimeout(resetIndexTimeout);
		}
	}, [visibleIndex, tips.length]);

	return (
		<div className="w-full h-[3.5rem] overflow-hidden px-[1.2rem] py-[0.8rem] rounded-[8px] bg-white label04-r-16">
			<div
				className={cn(
					"will-change-transform",
					isTransitionEnabled &&
						"transition-transform duration-400 ease-in-out",
				)}
				style={{ transform: `translateY(-${visibleIndex * ITEM_HEIGHT}px)` }}
			>
				{extendedTips.map((tip) => (
					<div
						key={tip.id}
						className="h-[3.5rem] overflow-hidden text-ellipsis whitespace-nowrap"
					>
						{tip.title}
					</div>
				))}
			</div>
		</div>
	);
};
