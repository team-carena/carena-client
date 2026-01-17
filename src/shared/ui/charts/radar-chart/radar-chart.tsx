import { useEffect, useState } from "react";

export const RADAR_CHART_MAP = {
	정상: 1.2,
	경계: 1.8,
	위험: 2.4,
} as const;

export type RiskLevelKey = keyof typeof RADAR_CHART_MAP; // "정상" | "경계" | "위험"

// 레이더 차트 타입
export interface RadarChartDataPoint {
	label: string;
	riskLevel: number; // 1.2(정상), 1.8(경계), 2.4(위험)
}

export interface RadarChartProps {
	data: RadarChartDataPoint[];
}

export const RadarChart = ({ data }: RadarChartProps) => {
	const [animationProgress, setAnimationProgress] = useState(0);

	// RadarChart 애니메이션
	useEffect(() => {
		const duration = 800; // 애니메이션 지속 시간 (ms)
		const startTime = performance.now();

		const animate = (currentTime: number) => {
			const elapsed = currentTime - startTime;
			const progress = Math.min(elapsed / duration, 1);

			// easeOutCubic easing 애니메이션 적용 함수
			const eased = 1 - (1 - progress) ** 3;
			setAnimationProgress(eased);

			if (progress < 1) {
				requestAnimationFrame(animate);
			}
		};

		requestAnimationFrame(animate);
	}, []);

	// SVG viewBox가 0 0 300 300 -> (150, 150)이 정확히 육각형 SVG의 중심
	const cx = 150; // 중심 X
	const cy = 150; // 중심 Y
	const outerHexagonRadius = 100; // 가장 큰 육각형의 반지름 (viewBox 내부 좌표계의 단위, 실제 100px(X))

	// 상수
	const LABEL_RECT_HALF_WIDTH = 14; // 라벨 흰배경 rect 너비의 절반 (28 / 2)
	const LABEL_RECT_HALF_HEIGHT = 8; // 라벨 흰배경 rect 높이의 절반 (16 / 2)
	const COS_30_DEG = Math.cos(Math.PI / 6); // cos(30°) ≈ 0.866, flat-top 육각형의 위쪽 변 y좌표 보정값
	const CATEGORY_LABEL_OFFSET = 14; // 카테고리 라벨과 육각형 경계 사이 간격

	// 육각형 꼭짓점 계산
	const getPoint = (index: number, radius: number) => {
		const angle = (Math.PI * 2 * index) / 6 - Math.PI / 3; // flat-top 육각형: 변이 위쪽에 오도록 시작 각도 -60°로 설정
		return {
			x: cx + radius * Math.cos(angle),
			y: cy + radius * Math.sin(angle),
		};
	};

	// 둥근 육각형 path 생성
	const createHexagonPath = (radius: number, borderRadius = 6) => {
		const sides = 6;
		const angleStep = (Math.PI * 2) / sides;
		const startAngle = -Math.PI / 3; // 시작 각도 -60° (flat-top 육각형)

		const points = Array.from({ length: sides }, (_, i) => {
			const angle = startAngle + i * angleStep;
			return {
				x: cx + radius * Math.cos(angle),
				y: cy + radius * Math.sin(angle),
			};
		});

		if (borderRadius <= 0) {
			return `${points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ")} Z`;
		}

		const r = Math.min(borderRadius, radius * 0.3);
		let path = "";

		for (let i = 0; i < sides; i++) {
			const curr = points[i];
			const next = points[(i + 1) % sides];
			const prev = points[(i - 1 + sides) % sides];

			const fromPrev = { x: curr.x - prev.x, y: curr.y - prev.y };
			const fromPrevLen = Math.sqrt(fromPrev.x ** 2 + fromPrev.y ** 2);
			const fromPrevNorm = {
				x: fromPrev.x / fromPrevLen,
				y: fromPrev.y / fromPrevLen,
			};

			const toNext = { x: next.x - curr.x, y: next.y - curr.y };
			const toNextLen = Math.sqrt(toNext.x ** 2 + toNext.y ** 2);
			const toNextNorm = { x: toNext.x / toNextLen, y: toNext.y / toNextLen };

			const startPoint = {
				x: curr.x - fromPrevNorm.x * r,
				y: curr.y - fromPrevNorm.y * r,
			};
			const endPoint = {
				x: curr.x + toNextNorm.x * r,
				y: curr.y + toNextNorm.y * r,
			};

			if (i === 0) {
				path += `M ${startPoint.x},${startPoint.y}`;
			}

			path += ` Q ${curr.x},${curr.y} ${endPoint.x},${endPoint.y}`;

			const nextStartPoint = {
				x: next.x - toNextNorm.x * r,
				y: next.y - toNextNorm.y * r,
			};
			path += ` L ${nextStartPoint.x},${nextStartPoint.y}`;
		}

		return `${path} Z`;
	};

	// 사용자 데이터 영역 생성 (보라색 영역) (렌더링 시 애니메이션 적용)
	const createDataPath = () => {
		return `${data
			.map((point, index) => {
				const radius =
					(point.riskLevel / 3) * outerHexagonRadius * animationProgress;
				const pos = getPoint(index, radius);
				return `${index === 0 ? "M" : "L"} ${pos.x} ${pos.y}`;
			})
			.join(" ")} Z`;
	};

	// 라벨 위치 계산 (혈압, 빈혈 등 라벨)
	const getLabelPosition = (index: number) => {
		const point = getPoint(index, outerHexagonRadius + CATEGORY_LABEL_OFFSET);
		return point;
	};

	return (
		<>
			{/* 레이더 차트 */}
			<div className="relative flex justify-center">
				<svg width="300" height="300" viewBox="0 0 300 300" role="img">
					<title>건강 상태 레이더 차트</title>
					{/* 육각형 테두리 그림자 필터 정의 */}
					<defs>
						<filter
							id="hexagon-shadow"
							x="-50%"
							y="-50%"
							width="200%"
							height="200%"
						>
							<feDropShadow
								dx="0"
								dy="2"
								stdDeviation="4"
								floodColor="#000"
								floodOpacity="0.1"
							/>
						</filter>
					</defs>

					{/* 육각형들 (5개) */}
					{/* 5번째(가장 바깥): 라벨 X */}
					<path
						d={createHexagonPath(outerHexagonRadius)}
						fill="white"
						filter="url(#hexagon-shadow)"
					/>
					{/* 4번째(의심) */}
					<path
						d={createHexagonPath(outerHexagonRadius * 0.8)}
						fill="none"
						stroke="var(--color-gray-300)"
						strokeWidth="1"
					/>
					{/* 3번째(경계) */}
					<path
						d={createHexagonPath(outerHexagonRadius * 0.6)}
						fill="none"
						stroke="var(--color-gray-300)"
						strokeWidth="1"
					/>
					{/* 2번째(정상) */}
					<path
						d={createHexagonPath(outerHexagonRadius * 0.4)}
						fill="none"
						stroke="var(--color-gray-300)"
						strokeWidth="1"
					/>
					{/* 가장 안쪽: 라벨 X */}
					<path
						d={createHexagonPath(outerHexagonRadius * 0.2)}
						fill="var(--color-gray-50)"
					/>

					{/* riskLevel 라벨 배경 (흰색 rect) */}
					{/* 디자인 반영을 위해 라벨 텍스트에 흰배경 추가(흰배경과 라벨 텍스트는 별도로 움직이므로 위치도 텍스트와 별도로 지정 필요) */}
					<rect
						x={cx - LABEL_RECT_HALF_WIDTH}
						y={
							cy -
							outerHexagonRadius * 0.4 * COS_30_DEG -
							LABEL_RECT_HALF_HEIGHT
						}
						width={LABEL_RECT_HALF_WIDTH * 2}
						height={LABEL_RECT_HALF_HEIGHT * 2}
						fill="var(--color-white)"
					/>
					<rect
						x={cx - LABEL_RECT_HALF_WIDTH}
						y={
							cy -
							outerHexagonRadius * 0.6 * COS_30_DEG -
							LABEL_RECT_HALF_HEIGHT
						}
						width={LABEL_RECT_HALF_WIDTH * 2}
						height={LABEL_RECT_HALF_HEIGHT * 2}
						fill="var(--color-white)"
					/>
					<rect
						x={cx - LABEL_RECT_HALF_WIDTH}
						y={
							cy -
							outerHexagonRadius * 0.8 * COS_30_DEG -
							LABEL_RECT_HALF_HEIGHT
						}
						width={LABEL_RECT_HALF_WIDTH * 2}
						height={LABEL_RECT_HALF_HEIGHT * 2}
						fill="var(--color-white)"
					/>

					{/* riskLevel 라벨 텍스트 */}
					<text
						x={cx}
						y={cy - outerHexagonRadius * 0.4 * COS_30_DEG}
						textAnchor="middle"
						dominantBaseline="middle"
						className="label03-m-12"
						fill="var(--color-gray-400)"
					>
						정상
					</text>
					<text
						x={cx}
						y={cy - outerHexagonRadius * 0.6 * COS_30_DEG}
						textAnchor="middle"
						dominantBaseline="middle"
						className="label03-m-12"
						fill="var(--color-gray-400)"
					>
						경계
					</text>
					<text
						x={cx}
						y={cy - outerHexagonRadius * 0.8 * COS_30_DEG}
						textAnchor="middle"
						dominantBaseline="middle"
						className="label03-m-12"
						fill="var(--color-gray-400)"
					>
						의심
					</text>

					{/* 데이터 영역 */}
					<path
						d={createDataPath()}
						fill="rgba(209, 175, 255, 0.2)"
						stroke="var(--color-secondary-500)"
						strokeWidth="1"
					/>

					{/* 데이터 포인트 */}
					{data.map((point, index) => {
						const radius =
							(point.riskLevel / 3) * outerHexagonRadius * animationProgress;
						const pos = getPoint(index, radius);
						return (
							<circle
								key={point.label}
								cx={pos.x}
								cy={pos.y}
								r="2"
								fill="var(--color-secondary-700)"
								opacity={animationProgress}
							/>
						);
					})}
				</svg>

				{/* 카테고리 라벨 */}
				{data.map((point, index) => {
					const pos = getLabelPosition(index);
					return (
						<span
							key={point.label}
							className="absolute label03-m-12 text-gray-900"
							style={{
								left: `calc(50% + ${pos.x - cx}px)`,
								top: `calc(50% + ${pos.y - cy}px)`,
								transform: "translate(-50%, -50%)",
							}}
						>
							{point.label}
						</span>
					);
				})}
			</div>
		</>
	);
};
