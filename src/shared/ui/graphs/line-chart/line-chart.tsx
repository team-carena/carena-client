import { useEffect, useMemo, useState } from "react";
import {
	ANIMATION,
	CHART_SIZE,
	COLORS,
	LABEL_TOTAL_HEIGHT,
	LAYOUT,
	POINT,
	TOP_SAFE_SPACE,
} from "./line-chart-config";

type LineChartData = {
	/** yyyy-mm */
	date: string;
	value: number;
};

interface LineChartProps {
	data: LineChartData[];
}

/** yyyy-mm → YY/MM */
const formatDateLabel = (date: string) => {
	const [year, month] = date.split("-");
	return `${year.slice(2)}/${month}`;
};

export const LineChart = ({ data }: LineChartProps) => {
	/**
	 * - mount 시 1회만 실행
	 * - re-render 시 불필요한 재실행 방지
	 */
	const [animated, setAnimated] = useState(false);

	useEffect(() => {
		setAnimated(true);
	}, []);

	/** 오래된 데이터 → 최신 데이터 순 정렬 (hook은 항상 최상단) */
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
	 * - 포인트 간 간격은 고정
	 * - 데이터 개수에 따라 전체 그래프를 중앙 정렬
	 */
	const chartWidth =
		CHART_SIZE.WIDTH - LAYOUT.PADDING.left - LAYOUT.PADDING.right;

	const usedWidth = isSingle ? 0 : (sortedData.length - 1) * LAYOUT.POINT_GAP;
	const startX = LAYOUT.PADDING.left + (chartWidth - usedWidth) / 2;

	const getX = (index: number) =>
		isSingle ? CHART_SIZE.WIDTH / 2 : startX + index * LAYOUT.POINT_GAP;

	/**
	 * Y 스케일 계산
	 * - 최소값: 데이터 최솟값의 90% (0 미만으로 내려가지 않도록 clamp)
	 * - 최대값: 데이터 최댓값의 110%
	 */
	const values = sortedData.map((d) => d.value);
	const yMin = Math.max(0, Math.min(...values) * 0.9);
	const yMax = Math.max(...values) * 1.1;

	const plotBottom = CHART_SIZE.HEIGHT - LAYOUT.PADDING.bottom;

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
			className="rounded-[12px] border border-gray-200 bg-white"
			style={{ width: CHART_SIZE.WIDTH, height: CHART_SIZE.HEIGHT }}
		>
			<svg
				width={CHART_SIZE.WIDTH}
				height={CHART_SIZE.HEIGHT}
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

				{!isSingle && (
					<path
						d={`
              M ${points[0].x} ${yBottom}
              L ${points.map((p) => `${p.x} ${p.y}`).join(" L ")}
              L ${points[points.length - 1].x} ${yBottom}
              Z
            `}
						fill="url(#areaGrad)"
						style={
							animated && !prefersReducedMotion
								? {
										opacity: 0,
										animation: `area-fade ${ANIMATION.DURATION} ${ANIMATION.EASING} forwards`,
									}
								: undefined
						}
					/>
				)}

				{isSingle ? (
					<line
						x1={points[0].x}
						y1={points[0].y}
						x2={points[0].x}
						y2={yBottom}
						stroke="url(#singleLineGrad)"
						strokeWidth={1}
						style={
							animated && !prefersReducedMotion
								? {
										strokeDasharray: ANIMATION.LINE_DASH,
										strokeDashoffset: ANIMATION.LINE_DASH,
										animation: `line-draw ${ANIMATION.DURATION} ${ANIMATION.EASING} forwards`,
									}
								: undefined
						}
					/>
				) : (
					<path
						d={linePath}
						fill="none"
						stroke={COLORS.LINE}
						strokeWidth={1}
						strokeLinecap="round"
						style={
							animated && !prefersReducedMotion
								? {
										strokeDasharray: ANIMATION.LINE_DASH,
										strokeDashoffset: ANIMATION.LINE_DASH,
										animation: `line-draw ${ANIMATION.DURATION} ${ANIMATION.EASING} forwards`,
									}
								: undefined
						}
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

					const textY = placeAbove
						? triangleBaseY - POINT.LABEL_GAP
						: triangleBaseY + POINT.LABEL_GAP + POINT.TEXT_HEIGHT;

					return (
						<g key={p.label}>
							<text
								x={p.x}
								y={textY}
								textAnchor="middle"
								className="body06-r-10"
								fill={COLORS.TEXT}
							>
								{p.value.toFixed(1)}
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
		</div>
	);
};
