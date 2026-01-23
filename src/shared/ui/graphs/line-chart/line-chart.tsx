import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
	ANIMATION,
	COLORS,
	LABEL_TOTAL_HEIGHT,
	LAYOUT,
	POINT,
	TOP_SAFE_SPACE,
} from "./line-chart-config";

/** 애니메이션 적용 여부에 따른 line-draw 스타일 반환 */
const getLineAnimationStyle = (shouldAnimate: boolean) =>
	shouldAnimate
		? {
				strokeDasharray: ANIMATION.LINE_DASH,
				strokeDashoffset: ANIMATION.LINE_DASH,
				animation: `line-draw ${ANIMATION.DURATION} ${ANIMATION.EASING} forwards`,
			}
		: undefined;

/** 애니메이션 적용 여부에 따른 area-fade 스타일 반환 */
const getAreaAnimationStyle = (shouldAnimate: boolean) =>
	shouldAnimate
		? {
				opacity: 0,
				animation: `area-fade ${ANIMATION.DURATION} ${ANIMATION.EASING} forwards`,
			}
		: undefined;

export type LineChartData = {
	value: number;
	date: string;
};

interface LineChartProps {
	data: LineChartData[];
}

/** yyyy-mm-dd → YY/MM */
const formatDateLabel = (date: string) => {
	const [year, month] = date.split("-");
	return `${year.slice(2)}/${month}`;
};

// 기본 높이 (고정)
const CHART_HEIGHT = 116;

export const LineChart = ({ data }: LineChartProps) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [containerWidth, setContainerWidth] = useState(0);

	// 컨테이너 크기 측정 (borderBoxSize 사용 - border 포함)
	useLayoutEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const resizeObserver = new ResizeObserver((entries) => {
			for (const entry of entries) {
				// borderBoxSize는 border 포함한 전체 크기
				const width =
					entry.borderBoxSize?.[0]?.inlineSize ?? entry.contentRect.width;
				setContainerWidth(width - LAYOUT.BORDER_WIDTH * 2);
			}
		});

		resizeObserver.observe(container);

		return () => resizeObserver.disconnect();
	}, []);

	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	/** 오래된 데이터 → 최신 데이터 순 정렬 */
	const sortedData = useMemo(
		() =>
			[...data].sort(
				(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
			),
		[data],
	);

	if (!sortedData.length) return null;

	/** 접근성: OS에서 motion 감소 설정 시 애니메이션 비활성화 */
	const prefersReducedMotion =
		typeof window !== "undefined" &&
		window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	const isSingle = sortedData.length === 1;

	/**
	 * X 좌표 계산
	 * - BASE_WIDTH(335px) 기준으로 BASE_POINT_GAP(63px)을 설정하고, 컨테이너 너비에 비례하여 스케일링
	 * - 그래프가 컨테이너 중앙에 정렬됨
	 */
	const chartWidth =
		containerWidth - LAYOUT.PADDING.left - LAYOUT.PADDING.right;
	const scaledPointGap =
		LAYOUT.BASE_POINT_GAP * (containerWidth / LAYOUT.BASE_WIDTH);
	const usedWidth = isSingle ? 0 : (sortedData.length - 1) * scaledPointGap;
	const startX = LAYOUT.PADDING.left + (chartWidth - usedWidth) / 2;

	const getX = (index: number) =>
		isSingle ? containerWidth / 2 : startX + index * scaledPointGap;

	/**
	 * Y 스케일 계산
	 * - 최소값: 데이터 최솟값의 90% (0 미만으로 내려가지 않도록 clamp)
	 * - 최대값: 데이터 최댓값의 110%
	 */
	const values = sortedData.map((d) => d.value);
	const yMin = Math.max(0, Math.min(...values) * 0.9);
	const yMax = Math.max(...values) * 1.1;

	const plotBottom = CHART_HEIGHT - LAYOUT.PADDING.bottom;

	const yTop = 0;
	const yBottom = plotBottom;
	const yRange = yBottom - yTop;

	/** value → SVG y 좌표 변환 */
	const getY = (value: number) => {
		if (yMax === yMin) return yTop + yRange / 2;

		const ratio = (value - yMin) / (yMax - yMin);
		return yTop + (1 - ratio) * yRange;
	};

	const points = sortedData.map((d, i) => ({
		x: getX(i),
		y: getY(d.value),
		value: d.value,
		label: formatDateLabel(d.date),
	}));

	const linePath = isSingle
		? ""
		: `M ${points.map((p) => `${p.x} ${p.y}`).join(" L ")}`;

	const axisLabelY = plotBottom + 6;

	return (
		<div
			ref={containerRef}
			className="w-full rounded-[12px] border border-gray-200 bg-white"
			style={{ height: CHART_HEIGHT }}
		>
			{containerWidth > 0 && (
				<svg
					width={containerWidth}
					height={CHART_HEIGHT}
					role="img"
					aria-label="검진 수치 추이 라인 차트"
				>
					<defs>
						<linearGradient
							id="areaGrad"
							x1="0"
							y1={yTop}
							x2="0"
							y2={yBottom}
							gradientUnits="userSpaceOnUse"
						>
							<stop offset="0%" stopColor={COLORS.LINE} stopOpacity={0.55} />
							<stop offset="100%" stopColor={COLORS.LINE} stopOpacity={0} />
						</linearGradient>

						<linearGradient
							id="singleLineGrad"
							x1="0"
							y1={yTop}
							x2="0"
							y2={yBottom}
							gradientUnits="userSpaceOnUse"
						>
							<stop offset="0%" stopColor={COLORS.LINE} />
							<stop offset="100%" stopColor={COLORS.LINE} stopOpacity={0} />
						</linearGradient>

						<style>
							{`
              @keyframes line-draw {
                to { stroke-dashoffset: 0; }
              }
              @keyframes area-fade {
                from { opacity: 0; }
                to { opacity: 1; }
              }
            `}
						</style>
					</defs>

					{/* 데이터가 하나일 때 */}
					{!isSingle && (
						<path
							d={`
              M ${points[0].x} ${yBottom}
              L ${points.map((p) => `${p.x} ${p.y}`).join(" L ")}
              L ${points[points.length - 1].x} ${yBottom}
              Z
            `}
							fill="url(#areaGrad)"
							style={getAreaAnimationStyle(isMounted && !prefersReducedMotion)}
						/>
					)}

					{/* 데이터가 2개 이상일 때 */}
					{isSingle ? (
						<line
							x1={points[0].x}
							y1={points[0].y}
							x2={points[0].x}
							y2={yBottom}
							stroke="url(#singleLineGrad)"
							strokeWidth={1}
							style={getLineAnimationStyle(isMounted && !prefersReducedMotion)}
						/>
					) : (
						<path
							d={linePath}
							fill="none"
							stroke={COLORS.LINE}
							strokeWidth={1}
							strokeLinecap="round"
							style={getLineAnimationStyle(isMounted && !prefersReducedMotion)}
						/>
					)}

					{points.map((p) => {
						/**
						 * 라벨 배치 규칙
						 * - 기본은 포인트 위
						 * - 라벨 전체 높이를 고려했을 때 상단 여백이 부족하면 아래로 배치
						 */
						const placeAbove = p.y - LABEL_TOTAL_HEIGHT >= TOP_SAFE_SPACE;

						const triangleTipY = placeAbove
							? p.y - POINT.RADIUS - POINT.LABEL_GAP
							: p.y + POINT.RADIUS + POINT.LABEL_GAP;

						const triangleBaseY = placeAbove
							? triangleTipY - POINT.TRIANGLE_HEIGHT
							: triangleTipY + POINT.TRIANGLE_HEIGHT;

						const textCenterY = placeAbove
							? // 삼각형 base 위로: (삼각형 base - gap) 지점이 텍스트 "아랫변"
								triangleBaseY - POINT.LABEL_GAP - POINT.TEXT_HEIGHT / 2
							: // 삼각형 base 아래로: (삼각형 base + gap) 지점이 텍스트 "윗변"
								triangleBaseY + POINT.LABEL_GAP + POINT.TEXT_HEIGHT / 2;

						return (
							<g key={p.label}>
								<text
									x={p.x}
									y={textCenterY}
									textAnchor="middle"
									dominantBaseline="central"
									className="body06-r-10"
									fill={COLORS.TEXT}
								>
									{p.value.toFixed(2)}
								</text>

								<polygon
									points={`${p.x} ${triangleTipY}
                  ${p.x - POINT.TRIANGLE_WIDTH / 2} ${triangleBaseY}
                  ${p.x + POINT.TRIANGLE_WIDTH / 2} ${triangleBaseY}`}
									fill={COLORS.TRIANGLE}
								/>

								<circle
									cx={p.x}
									cy={p.y}
									r={POINT.RADIUS}
									fill={COLORS.POINT}
									stroke={COLORS.POINT_STROKE}
									strokeWidth={1}
								/>
							</g>
						);
					})}

					{points.map((p) => (
						<text
							key={p.label}
							x={p.x}
							y={axisLabelY}
							textAnchor="middle"
							className="body06-r-10"
							fill={COLORS.AXIS_LABEL}
						>
							{p.label}
						</text>
					))}
				</svg>
			)}
		</div>
	);
};
