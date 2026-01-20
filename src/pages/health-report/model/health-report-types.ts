// 검진결과 타입
export type HealthReportType =
	| "basic"
	| "blood-pressure"
	| "diabetes"
	| "liver"
	| "kidney"
	| "anemia";

// 사용자 성별
export type Gender = "male" | "female";

/**
 * 정상 / 경계 / 의심 수치 범위
 * - 항목에 따라 일부 값은 없을 수 있음
 */
export interface HealthReportRangeValue {
	/** 정상 범위 표시 텍스트 */
	normal: string;

	/** 경계 범위 표시 텍스트 */
	warning: string;

	/** 의심 범위 표시 텍스트 (없을 수도 있음) */
	danger?: string;
}

/**
 * 수치 범위 타입
 * - 성별 구분 없는 경우: HealthReportRangeValue
 * - 성별 구분 필요한 경우: { male, female }
 */
export type HealthReportRange =
	| {
			type: "common";
			value: HealthReportRangeValue;
	  }
	| {
			type: "gender";
			male: HealthReportRangeValue;
			female: HealthReportRangeValue;
	  };

/** 이런 습관이 도움돼요! */
export type HabitGuide =
	| {
			/** 일반 리스트 */
			type: "list";
			items: string[];
	  }
	| {
			/** 소제목 + 리스트 */
			type: "group";
			groups: {
				title: string;
				items: string[];
			}[];
	  };

/**
 * 개별 항목(섹션) 설정
 * - 그래프 + 설명만 있는 경우도 있으므로 대부분 optional
 */
export interface HealthReportSection {
	key: string;
	title: string;
	description: string;

	/** 정상/경계/의심 수치 범위 */
	range?: HealthReportRange;

	/** 결과값 의미 */
	increaseText?: string;
	decreaseText?: string;

	habitGuide?: HabitGuide;

	/** 출처 */
	source?: string;

	/** 섹션 하단 구분선 표시 여부 */
	showDivider?: boolean;
}

/**
 * 검진결과 상세 페이지 설정
 */
export interface HealthReportConfig {
	/** 헤더 타이틀 */
	headerTitle: string;

	/** 항목별 결과 섹션 */
	sections: HealthReportSection[];
}
