/**
 * 검진결과 GET API 응답 데이터를 폼 입력값으로 변환하는 역할
 * 검진결과 API 응답(카테고리별 배열 구조)을 건강검진결과 추가/수정 폼에서 사용하는 flat한 문자열 구조(CheckupFormInput)로 변환
 * → 검진결과 API 응답 데이터를 검진결과수정 페이지의 폼에 넣을 수 있도록 세팅
 */

import type { CheckupFormInput } from "@/pages/checkup-result/model/checkup-schema";
import type {
	DisplayElement,
	EntireHealthReportView,
} from "@/shared/configs/health-report/health-report.types";

const findValue = (
	elements: DisplayElement[] | undefined,
	name: string,
): string => {
	const el = elements?.find((e) => e.name === name);
	return el?.value != null ? String(el.value) : "";
};

export const toCheckupFormInput = (
	report: EntireHealthReportView,
	institutionName: string,
): CheckupFormInput => {
	const [year = "", month = "", day = ""] = (
		report.healthCheckDate ?? ""
	).split("-");

	return {
		checkupDate: { year, month, day },
		hospital: institutionName,
		height: findValue(report.basic, "height"),
		weight: findValue(report.basic, "weight"),
		bmi: findValue(report.basic, "bmi"),
		waistCircumference: findValue(report.basic, "waistCircumference"),
		systolicBp: findValue(report.bloodPressure, "systolicBloodPressure"),
		diastolicBp: findValue(report.bloodPressure, "diastolicBloodPressure"),
		hemoglobin: findValue(report.anemia, "hemoglobin"),
		fastingGlucose: findValue(report.diabetes, "fastingGlucose"),
		serumCreatinine: findValue(report.kidney, "serumCreatinine"),
		egfr: findValue(report.kidney, "egfr"),
		ast: findValue(report.liver, "ast"),
		alt: findValue(report.liver, "alt"),
		gammaGtp: findValue(report.liver, "gammaGtp"),
	};
};
