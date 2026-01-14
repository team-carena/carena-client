import { useEffect, useState } from "react";

interface TickerProps {
	tips: string[];
}

export const Ticker = ({ tips }: TickerProps) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const itemHeight = 35;

	const extendedTips = [...tips, tips[0]];

	// 계속 내려가게 만드는 핵심...
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex((prev) => prev + 1);
		}, 3000);

		return () => clearInterval(interval);
	}, []);

	// 끝에서 순간이동...
	useEffect(() => {
		if (currentIndex === tips.length) {
			const timer = setTimeout(() => {
				setCurrentIndex(0);
			}, 400);

			return () => clearTimeout(timer);
		}
	}, [currentIndex, tips.length]);

	return (
		<div
			className="border w-full px-[1.2rem] py-[0.8rem] rounded-[8px] bg-white label04-r-16 overflow-hidden"
			style={{ height: itemHeight }}
		>
			<div
				style={{
					transform: `translateY(-${currentIndex * itemHeight}px)`,
					transition: "transform 0.4s ease-in-out",
				}}
			>
				{extendedTips.map((tip, index) => (
					<div
						key={`${index}-${tip}`}
						style={{
							height: itemHeight,
							display: "flex",
							alignItems: "center",
						}}
					>
						{tip}
					</div>
				))}
			</div>
		</div>
	);
};
