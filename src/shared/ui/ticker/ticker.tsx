import { useEffect, useState } from "react";
import { cn } from "@/shared/libs/cn";

interface Tips {
	id: number;
	title: string;
} // TODO: 건강 팁 api 응답 타입을 export 해오기

interface TickerProps {
	tips: Tips[];
}

const TRANSITION_DURATION = 400;

export const Ticker = ({ tips = [] }: TickerProps) => {
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
		if (tips.length === 0) return;
		if (visibleIndex === tips.length) {
			const resetIndexTimeout = setTimeout(() => {
				setIsTransitionEnabled(false);
				setVisibleIndex(0);
			}, TRANSITION_DURATION);

			return () => clearTimeout(resetIndexTimeout);
		}
	}, [visibleIndex, tips.length]);

	if (tips.length === 0) {
		return null;
	}

	return (
		<div className="w-full min-w-[31.1rem] h-[3.5rem] overflow-hidden px-[1.2rem] py-[0.8rem] rounded-[8px] bg-white label04-r-16">
			<div
				className={cn(
					"will-change-transform",
					isTransitionEnabled &&
						`transition-transform duration-${TRANSITION_DURATION} ease-in-out`,
				)}
				style={{ transform: `translateY(-${visibleIndex * ITEM_HEIGHT}px)` }}
			>
				{extendedTips.map((tip, index) => (
					<div
						key={`${tip.id}-${index}`}
						className="h-[3.5rem] overflow-hidden text-ellipsis whitespace-nowrap"
					>
						{tip.title}
					</div>
				))}
			</div>
		</div>
	);
};
