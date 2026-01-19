export type HealthReportType =
	| "basic" // 기본 검사
	| "blood-pressure" // 혈압 검사
	| "liver" // 간장질환 검사
	| "kidney" // 신장질환 검사
	| "anemia" // 빈혈 검사
	| "diabetes"; // 당뇨 검사

export interface HealthReportRange {
	normalMax: number;
	warningMin: number;
	warningMax: number;
	dangerMin: number;
}

export interface HealthReportSection {
	key: string;
	title: string;
	description: string;
	range: HealthReportRange;
	increaseText: string;
	decreaseText: string;
	habitText: string;
}

export interface HealthReportConfig {
	headerTitle: string;
	sections: HealthReportSection[];
}
