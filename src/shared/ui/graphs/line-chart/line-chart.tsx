import { useEffect, useState } from "react";
import {
	ANIMATION,
	CHART_SIZE,
	COLORS,
	LAYOUT,
	POINT,
} from "./line-chart.config";

type LineChartData = {
	label: string;
	value: number;
};

interface LineChartProps {
	data: LineChartData[];
}

export const LineChart = ({ data }: LineChartProps) => {
	/** ===== 애니메이션 제어 =====
	 * - mount 시 1회만 실행
	 * - re-render 시 불필요한 재실행 방지
	 */
	const [animated, setAnimated] = useState(false);

	useEffect(() => {
		setAnimated(true);
	}, []);

	// 데이터가 없는 경우 차트 렌더링하지 않음
	if (!data.length) return null;

	const isSingle = data.length === 1;

	// 사용자 접근성 설정 (움직임 최소화 옵션)
	const prefersReducedMotion =
		typeof window !== "undefined" &&
		window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	/** ===== X 좌표 계산 =====
	 * - 포인트 간 간격은 고정
	 * - 데이터 개수에 따라 전체 그래프를 중앙 정렬
	 */
	const chartWidth =
		CHART_SIZE.WIDTH - LAYOUT.PADDING.left - LAYOUT.PADDING.right;

	const usedWidth = isSingle ? 0 : (data.length - 1) * LAYOUT.POINT_GAP;

	const startX = LAYOUT.PADDING.left + (chartWidth - usedWidth) / 2;

	const getX = (index: number) =>
		isSingle ? CHART_SIZE.WIDTH / 2 : startX + index * LAYOUT.POINT_GAP;

	/** ===== Y 좌표 계산 =====
	 * - 값의 비율을 기반으로 그래프 영역 내에 매핑
	 * - 최대값/최소값이 같은 경우 중앙에 배치
	 */
	const values = data.map((d) => d.value);
	const max = Math.max(...values);
	const min = Math.min(...values);

	const plotBottom = CHART_SIZE.HEIGHT - LAYOUT.PADDING.bottom - 12;

	const yTop = LAYOUT.PLOT_TOP + LAYOUT.Y_MARGIN;
	const yBottom = plotBottom - LAYOUT.Y_MARGIN;
	const yRange = yBottom - yTop;

	const getY = (value: number) => {
		if (max === min) return yTop + yRange / 2;

		const ratio = (value - min) / (max - min);
		return yTop + (1 - ratio) * yRange;
	};

	/** ===== 좌표 계산된 포인트 ===== */
	const points = data.map((d, i) => ({
		x: getX(i),
		y: getY(d.value),
		value: d.value,
		label: d.label,
	}));

	/** ===== SVG Path ===== */
	const linePath = isSingle
		? ""
		: `M ${points.map((p) => `${p.x} ${p.y}`).join(" L ")}`;

	const areaPath = isSingle
		? ""
		: `
      M ${points[0].x} ${yBottom}
      L ${points.map((p) => `${p.x} ${p.y}`).join(" L ")}
      L ${points[points.length - 1].x} ${yBottom}
      Z
    `;

	// 라벨(텍스트 + 삼각형)이 차트 영역을 벗어나지 않도록 판단하기 위한 기준 높이
	const LABEL_TOTAL_HEIGHT =
		POINT.TEXT_HEIGHT + POINT.TRIANGLE_HEIGHT + POINT.LABEL_GAP * 2;

	return (
		<div
			className="rounded-[12px] border border-gray-200 bg-white"
			style={{
				width: CHART_SIZE.WIDTH,
				height: CHART_SIZE.HEIGHT,
			}}
		>
			<svg
				width={CHART_SIZE.WIDTH}
				height={CHART_SIZE.HEIGHT}
				role="img"
				aria-label="라인 차트"
			>
				<defs>
					{/* 영역 그래프용 그라데이션 */}
					<linearGradient
						id="areaGrad"
						x1="0"
						y1={LAYOUT.PLOT_TOP}
						x2="0"
						y2={plotBottom}
						gradientUnits="userSpaceOnUse"
					>
						<stop offset="0%" stopColor={COLORS.LINE} stopOpacity={0.55} />
						<stop offset="100%" stopColor={COLORS.LINE} stopOpacity={0} />
					</linearGradient>

					{/* 단일 데이터 라인용 그라데이션 */}
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

					{/* 차트 애니메이션 정의 */}
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

				{/* ===== 그래프 영역 ===== */}
				{isSingle ? (
					// 단일 데이터: 세로 라인으로 표현
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
					<>
						{/* 영역 그래프 */}
						<path
							d={areaPath}
							fill="url(#areaGrad)"
							style={
								animated && !prefersReducedMotion
									? {
											animation: `area-fade ${ANIMATION.DURATION} ${ANIMATION.EASING} forwards`,
										}
									: undefined
							}
						/>

						{/* 라인 그래프 */}
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
					</>
				)}

				{/* ===== 포인트 & 수치 라벨 ===== */}
				{points.map((p) => {
					// 라벨이 위에 들어갈 수 있는 공간이 있으면 위, 아니면 아래 배치
					const placeAbove = p.y - LABEL_TOTAL_HEIGHT >= LAYOUT.PLOT_TOP;

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
								fill={COLORS.TEXT}
								className="body06-r-10"
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

				{/* ===== X축 날짜 라벨 ===== */}
				{points.map((p) => (
					<text
						key={p.label}
						x={p.x}
						y={CHART_SIZE.HEIGHT - 4}
						textAnchor="middle"
						fill={COLORS.AXIS_LABEL}
						className="body06-r-10"
					>
						{p.label}
					</text>
				))}
			</svg>
		</div>
	);
};
