import type {
	HealthReportConfig,
	HealthReportType,
} from "./health-report-types";

/**
 * 검진결과분석 상세 페이지 설정
 * - 각 검사 타입별 섹션 구성 정보
 */
export const HEALTH_REPORT_CONFIG: Record<
	HealthReportType,
	HealthReportConfig
> = {
	"blood-pressure": {
		headerTitle: "혈압 검사",
		sections: [
			{
				key: "systolic",
				title: "수축기 혈압",
				description: "수축기 혈압에 대한 설명입니다.",
				range: {
					normalMax: 120,
					warningMin: 120,
					warningMax: 139,
					dangerMin: 140,
				},
				increaseText: "수축기 혈압이 증가하면 이런 영향이 있습니다.",
				decreaseText: "수축기 혈압이 감소하면 이런 영향이 있습니다.",
				habitText: "규칙적인 운동과 저염식을 유지하세요.",
			},
		],
	},

	liver: {
		headerTitle: "간장질환 검사",
		sections: [],
	},

	kidney: {
		headerTitle: "신장질환 검사",
		sections: [],
	},

	anemia: {
		headerTitle: "빈혈 검사",
		sections: [],
	},

	diabetes: {
		headerTitle: "당뇨 검사",
		sections: [],
	},

	basic: {
		headerTitle: "기본 검사",
		sections: [],
	},
};

/**
 * 검진결과분석 상세페이지 헤더 타이틀 매핑
 * - Layout에서 라우터 params(type) 기반으로 사용
 */
export const HEALTH_REPORT_TITLE_MAP: Record<HealthReportType, string> = {
	"blood-pressure": "혈압 검사",
	liver: "간장질환 검사",
	kidney: "신장질환 검사",
	anemia: "빈혈 검사",
	diabetes: "당뇨 검사",
	basic: "기본 검사",
};
