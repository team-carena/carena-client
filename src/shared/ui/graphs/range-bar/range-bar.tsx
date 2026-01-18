import * as React from "react";

const RANGE_BAR_HEIGHT_REM = 1.6;
const BLEND_WIDTH_PCT = 4;

interface Segment {
	from: number;
	to: number;
	color: string;
}

export interface RangeBarProps {
	value: number;
	domainMin: number;
	domainMax: number;
	segments: Segment[];
}

const clamp = (v: number, min: number, max: number) =>
	Math.min(max, Math.max(min, v));

/* --------------------------------------------------
 segments → 정확한 퍼센트 gradient 생성
 * -------------------------------------------------- */
const buildGradientFromSegments = (
	domainMin: number,
	domainMax: number,
	segments: Segment[],
) => {
	const span = domainMax - domainMin;
	if (span <= 0 || segments.length === 0) return "none";

	//값을 domain 기준 0~100%로 위치로 변환
	const pct = (v: number) => clamp(((v - domainMin) / span) * 100, 0, 100);

	const stops: string[] = [];
	const add = (color: string, p: number) => stops.push(`${color} ${p}%`);

	add(segments[0].color, pct(segments[0].from));

	// 각 경계 기준으로 좌우 일정 폭만 블렌딩
	for (let i = 0; i < segments.length - 1; i += 1) {
		const cur = segments[i];
		const next = segments[i + 1];

		const boundary = pct(cur.to);
		const left = clamp(boundary - BLEND_WIDTH_PCT, 0, 100);
		const right = clamp(boundary + BLEND_WIDTH_PCT, 0, 100);

		add(cur.color, left);
		add(cur.color, left);
		add(next.color, right);
		add(next.color, right);
	}

	const last = segments[segments.length - 1];
	add(last.color, pct(last.to));

	return `linear-gradient(90deg, ${stops.join(", ")})`;
};

/* --------------------------------------------------
 * tick 생성
 * -------------------------------------------------- */
const getTicksFromSegments = (
	domainMin: number,
	domainMax: number,
	segments: Segment[],
) => {
	const span = domainMax - domainMin;
	if (span <= 0) return [];

	const toPct = (v: number) => ((v - domainMin) / span) * 100;

	return segments
		.slice(1) //  첫 구간 시작 제외
		.map((seg) => ({
			value: seg.from, // tick 아래 표시할 값
			pct: toPct(seg.from), // tick 위치
		}));
};

/* --------------------------------------------------
 * RangeBar 컴포넌트
 * -------------------------------------------------- */
export const RangeBar = ({
	value,
	domainMin,
	domainMax,
	segments,
}: RangeBarProps) => {
	//segments 바뀔 때만 그라데이션 재생성
	const gradient = React.useMemo(
		() => buildGradientFromSegments(domainMin, domainMax, segments),
		[domainMin, domainMax, segments],
	);
	//segment 경계 기준 tick 생성
	const ticksToRender = getTicksFromSegments(domainMin, domainMax, segments);

	const markerPct =
		value === null
			? null
			: ((clamp(value, domainMin, domainMax) - domainMin) /
					(domainMax - domainMin)) *
				100;

	return (
		<div className="w-full">
			<div className="relative">
				{/* BAR */}
				<div
					className="relative w-full rounded-full"
					style={{ height: `${RANGE_BAR_HEIGHT_REM}rem` }}
				>
					{/* main layer */}
					<div
						className="absolute inset-0 rounded-full"
						style={{ backgroundImage: gradient }}
					/>

					{/* TICKS */}
					{ticksToRender.map(({ pct, value }) => (
						<div
							key={String(value)}
							className="absolute flex flex-col items-center"
							style={{
								left: `${pct}%`,
								top: `calc(${RANGE_BAR_HEIGHT_REM}rem - 1rem )`,
								transform: "translateX(-50%)",
							}}
						>
							<div className="w-px h-[1rem] bg-gray-600" />
							<span className="body06-r-10 text-gray-600">{value}</span>
						</div>
					))}
				</div>

				{/* MARKER */}
				{markerPct !== null && (
					<div
						className="absolute"
						style={{
							left: `${markerPct}%`,
							top: `-0.375rem`,
							transform: "translateX(-50%)",
						}}
					>
						<div className="relative flex flex-col items-center">
							<span
								className="absolute body06-r-10 text-gray-900"
								style={{ bottom: "calc(100%)" }}
							>
								{value}
							</span>
							{/* triangle */}
							<div className="w-0 h-0 border-primary-500 border-l-[0.3125rem] border-r-[0.3125rem] border-t-[0.375rem] border-l-transparent border-r-transparent" />
							<div className="w-px h-[1.8rem] bg-primary-800" />
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
