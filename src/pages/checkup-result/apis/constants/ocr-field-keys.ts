import type { CheckupFormInput } from "@/pages/checkup-result/model/checkup-schema";

export const OCR_FIELD_KEYS: Array<keyof CheckupFormInput> = [
	"hospital",
	"height",
	"weight",
	"bmi",
	"waistCircumference",
	"systolicBp",
	"diastolicBp",
	"hemoglobin",
	"fastingGlucose",
	"serumCreatinine",
	"egfr",
	"ast",
	"alt",
	"gammaGtp",
];
