type SegmentsMode = 2 | 3 | 4;

export type Sex = "MALE" | "FEMALE";

export type HealthMetricType =
	| "waist"
	| "bmi"
	| "systolic"
	| "diastolic"
	| "fastingGlucose"
	| "ast"
	| "alt"
	| "ggtp"
	| "creatinine"
	| "egfr"
	| "hb";

interface Segment {
	from: number;
	to: number;
	color: string;
}

export interface HealthMetricConfig {
	key: string;
	label: string;
	unit: string;

	/* 사용자가 입력 가능한 전체 범위 */
	inputMin: number;
	inputMax: number;

	/* 그래프 시각화 범위 */
	domainMin: number;
	domainMax: number;

	/* 각 지표는 고정 mode만 사용 */
	mode: SegmentsMode;

	/* mode에 대응하는 segments만 보관 */
	segments: Segment[];

	/* tick 아래에 표시할 경계값 */
	fractionDigits?: number;
}

const COLOR = {
	normal: "#98EA94",
	border: "#9CCBFF",
	danger: "#FFC1C7",
} as const;

const makeSegments = (
	segments: Array<Omit<Segment, "color"> & { tone: keyof typeof COLOR }>,
) =>
	segments.map((s) => ({
		from: s.from,
		to: s.to,
		color: COLOR[s.tone],
	}));

export const healthMetricConfigs: Record<string, HealthMetricConfig> = {
	// 허리둘레(남)
	waistMale: {
		key: "waistMale",
		label: "허리둘레(남)",
		unit: "cm",
		inputMin: 20,
		inputMax: 250,
		domainMin: 60,
		domainMax: 100,
		mode: 2,
		fractionDigits: 0,
		segments: makeSegments([
			{ from: 60, to: 90, tone: "normal" },
			{ from: 90, to: 100, tone: "danger" },
		]),
	},

	// 허리둘레(여)
	waistFemale: {
		key: "waistFemale",
		label: "허리둘레(여)",
		unit: "cm",
		inputMin: 20,
		inputMax: 250,
		domainMin: 55,
		domainMax: 95,
		mode: 2,
		fractionDigits: 0,
		segments: makeSegments([
			{ from: 55, to: 85, tone: "normal" },
			{ from: 85, to: 95, tone: "danger" },
		]),
	},

	// BMI
	bmi: {
		key: "bmi",
		label: "체질량지수(BMI)",
		unit: "kg/m²",
		inputMin: 0,
		inputMax: 100,
		domainMin: 15,
		domainMax: 40,
		mode: 4,
		fractionDigits: 1,
		segments: makeSegments([
			{ from: 15, to: 18.5, tone: "border" },
			{ from: 18.5, to: 25, tone: "normal" },
			{ from: 25, to: 30, tone: "border" },
			{ from: 30, to: 40, tone: "danger" },
		]),
	},

	// 수축기
	systolic: {
		key: "systolic",
		label: "수축기혈압",
		unit: "mmHg",
		inputMin: 0,
		inputMax: 300,
		domainMin: 90,
		domainMax: 160,
		mode: 3,
		fractionDigits: 0,
		segments: makeSegments([
			{ from: 90, to: 120, tone: "normal" },
			{ from: 120, to: 140, tone: "border" },
			{ from: 140, to: 160, tone: "danger" },
		]),
	},

	// 이완기
	diastolic: {
		key: "diastolic",
		label: "이완기혈압",
		unit: "mmHg",
		inputMin: 0,
		inputMax: 300,
		domainMin: 65,
		domainMax: 100,
		mode: 3,
		fractionDigits: 0,
		segments: makeSegments([
			{ from: 65, to: 80, tone: "normal" },
			{ from: 80, to: 90, tone: "border" },
			{ from: 90, to: 100, tone: "danger" },
		]),
	},

	// 공복혈당
	fastingGlucose: {
		key: "fastingGlucose",
		label: "공복혈당",
		unit: "mg/dL",
		inputMin: 30,
		inputMax: 700,
		domainMin: 65,
		domainMax: 180,
		mode: 3,
		fractionDigits: 0,
		segments: makeSegments([
			{ from: 65, to: 100, tone: "normal" },
			{ from: 100, to: 126, tone: "border" },
			{ from: 126, to: 180, tone: "danger" },
		]),
	},

	// AST
	ast: {
		key: "ast",
		label: "AST",
		unit: "U/L",
		inputMin: 0,
		inputMax: 10000,
		domainMin: 18,
		domainMax: 80,
		mode: 3,
		fractionDigits: 0,
		segments: makeSegments([
			{ from: 18, to: 40, tone: "normal" },
			{ from: 40, to: 51, tone: "border" },
			{ from: 51, to: 80, tone: "danger" },
		]),
	},

	// ALT
	alt: {
		key: "alt",
		label: "ALT",
		unit: "U/L",
		inputMin: 0,
		inputMax: 10000,
		domainMin: 15,
		domainMax: 66,
		mode: 3,
		fractionDigits: 0,
		segments: makeSegments([
			{ from: 15, to: 35, tone: "normal" },
			{ from: 35, to: 46, tone: "border" },
			{ from: 46, to: 66, tone: "danger" },
		]),
	},

	// γ-GTP(남)
	ggtpMale: {
		key: "ggtpMale",
		label: "γ-GTP(남)",
		unit: "U/L",
		inputMin: 0,
		inputMax: 3000,
		domainMin: 11,
		domainMax: 100,
		mode: 3,
		fractionDigits: 0,
		segments: makeSegments([
			{ from: 11, to: 64, tone: "normal" },
			{ from: 64, to: 78, tone: "border" },
			{ from: 78, to: 100, tone: "danger" },
		]),
	},

	// γ-GTP(여)
	ggtpFemale: {
		key: "ggtpFemale",
		label: "γ-GTP(여)",
		unit: "U/L",
		inputMin: 0,
		inputMax: 3000,
		domainMin: 8,
		domainMax: 80,
		mode: 3,
		fractionDigits: 0,
		segments: makeSegments([
			{ from: 8, to: 36, tone: "normal" },
			{ from: 36, to: 46, tone: "border" },
			{ from: 46, to: 80, tone: "danger" },
		]),
	},

	// 혈청 크레아티닌 - mode 2
	creatinine: {
		key: "creatinine",
		label: "혈청 크레아티닌",
		unit: "mg/dL",
		inputMin: 0,
		inputMax: 20,
		domainMin: 0.5,
		domainMax: 2.0,
		mode: 2,
		fractionDigits: 1,
		segments: makeSegments([
			{ from: 0.5, to: 1.5, tone: "normal" },
			{ from: 1.5, to: 2.0, tone: "danger" },
		]),
	},

	// 신사구체여과율(eGFR)
	egfr: {
		key: "egfr",
		label: "신사구체여과율",
		unit: "mL/min/1.73m²",
		inputMin: 0,
		inputMax: 200,
		domainMin: 45,
		domainMax: 100,
		mode: 2,
		fractionDigits: 0,
		segments: makeSegments([
			{ from: 45, to: 60, tone: "danger" },
			{ from: 60, to: 100, tone: "normal" },
		]),
	},

	// 혈색소(남)
	hbMale: {
		key: "hbMale",
		label: "혈색소(남)",
		unit: "g/dL",
		inputMin: 0,
		inputMax: 30,
		domainMin: 10,
		domainMax: 18,
		mode: 4,
		fractionDigits: 1,
		segments: makeSegments([
			{ from: 10, to: 12.0, tone: "danger" },
			{ from: 12.0, to: 13.0, tone: "border" },
			{ from: 13.0, to: 16.5, tone: "normal" },
			{ from: 16.5, to: 18, tone: "danger" },
		]),
	},

	// 혈색소(여)
	hbFemale: {
		key: "hbFemale",
		label: "혈색소(여)",
		unit: "g/dL",
		inputMin: 0,
		inputMax: 30,
		domainMin: 9,
		domainMax: 17,
		mode: 4,
		fractionDigits: 1,
		segments: makeSegments([
			{ from: 9, to: 10.0, tone: "danger" },
			{ from: 10.0, to: 12.0, tone: "border" },
			{ from: 12.0, to: 15.6, tone: "normal" },
			{ from: 15.6, to: 17.0, tone: "danger" },
		]),
	},
};

const getConfigKeyBySex = (base: HealthMetricType, sex?: Sex) => {
	// TODO : 성별/공통 오버로드 적용
	const sexRequired = ["waist", "ggtp", "hb"];
	if (sexRequired.includes(base) && !sex) {
		throw new Error(`Sex is required for health metric type: ${base}`);
	}
	if (!sex) return base;

	switch (base) {
		case "waist":
			return sex === "MALE" ? "waistMale" : "waistFemale";
		case "ggtp":
			return sex === "MALE" ? "ggtpMale" : "ggtpFemale";
		case "hb":
			return sex === "MALE" ? "hbMale" : "hbFemale";
		default:
			return base;
	}
};

// 헬퍼: config 가져오기
export const getHealthMetricConfig = (key: HealthMetricType, sex?: Sex) => {
	const configKey = getConfigKeyBySex(key, sex);
	return healthMetricConfigs[configKey];
};

/**
 *  RangeBar에 바로 넣기 좋은 형태로 변환
 */
export const getRangeBarData = (key: HealthMetricType, sex?: Sex) => {
	const cfg = getHealthMetricConfig(key, sex);

	return {
		mode: cfg.mode,
		domainMin: cfg.domainMin,
		domainMax: cfg.domainMax,
		segments: cfg.segments,
		fractionDigits: cfg.fractionDigits,
		unit: cfg.unit,
		label: cfg.label,
	};
};
