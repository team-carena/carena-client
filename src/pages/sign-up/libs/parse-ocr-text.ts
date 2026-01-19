import { extractValue } from "./extract-value";

export const parseOcrText = (text: string) => {
	return {
		// 계측검사
		height: extractValue(text, ["키", "신장"]),
		weight: extractValue(text, ["몸무게", "체중"]),
		bmi: extractValue(text, ["체질량 지수", "BMI"]),
		waist: extractValue(text, ["허리둘레"]),

		// 혈압
		systolic: extractValue(text, ["수축기"]),
		diastolic: extractValue(text, ["이완기"]),

		// 혈액검사
		hemoglobin: extractValue(text, ["혈색소"]),
		fastingGlucose: extractValue(text, ["공복혈당"]),
		serumCreatinine: extractValue(text, ["혈청 크레아티닌", "크레아티닌"]),
		gfr: extractValue(text, ["신사구체여과율", "GFR"]),
		ast: extractValue(text, ["에이에스티", "AST"]),
		alt: extractValue(text, ["에이엘티", "ALT"]),
		ggt: extractValue(text, ["감마지피티", "GGT"]),
	};
};
