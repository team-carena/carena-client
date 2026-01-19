// 차트 전체 크기
export const CHART_SIZE = {
	WIDTH: 311,
	HEIGHT: 116,
};

// 차트 내부 여백 및 그래프 영역 기준값
export const LAYOUT = {
	PADDING: { left: 8, right: 8, bottom: 4 },
	POINT_GAP: 63,
	PLOT_TOP: 22,
	Y_MARGIN: 10,
};

// 포인트 및 라벨
export const POINT = {
	RADIUS: 2,
	TRIANGLE_WIDTH: 6,
	TRIANGLE_HEIGHT: 4,
	LABEL_GAP: 2,
	TEXT_HEIGHT: 10,
};

// 디자인 토큰 기반 색상
export const COLORS = {
	LINE: "var(--color-secondary-500)",
	POINT: "var(--color-secondary-700)",
	POINT_STROKE: "var(--color-gray-50)",
	TRIANGLE: "var(--color-primary-500)",
	TEXT: "var(--color-black)",
	AXIS_LABEL: "var(--color-gray-600)",
};

// 애니메이션 설정
export const ANIMATION = {
	DURATION: "0.6s",
	EASING: "ease-out",
	LINE_DASH: 400,
};
