// 차트 레이아웃 기준
export const LAYOUT = {
	PADDING: {
		left: 8,
		right: 8,
		bottom: 14, // X축 날짜 라벨 영역
	},
	BASE_POINT_GAP: 63, // 그래프의 포인트 기본 간격
	BASE_WIDTH: 335, // 그래프의 컨테이너 기본 너비
	BORDER_WIDTH: 1, // 컨테이너 border 두께
};

// 포인트 및 라벨
export const POINT = {
	RADIUS: 2,
	TRIANGLE_WIDTH: 6,
	TRIANGLE_HEIGHT: 4,
	LABEL_GAP: 2,
	TEXT_HEIGHT: 10,
};

// 색상 토큰
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
	DURATION: "1s",
	EASING: "ease-out",
	LINE_DASH: 400,
};

// 라벨(텍스트 + 삼각형) 전체 높이
export const LABEL_TOTAL_HEIGHT =
	POINT.TEXT_HEIGHT + POINT.TRIANGLE_HEIGHT + POINT.LABEL_GAP * 2;

// 상단으로부터 확보해야 하는 최소 여백
export const TOP_SAFE_SPACE = 10;
