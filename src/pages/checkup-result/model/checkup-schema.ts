import { z } from "zod";
import {
	birthDateSchema,
	checkupDateSchema,
	decimalOnePlace,
	decimalTwoPlaces,
	ERROR_MESSAGES,
	genderSchema,
	hospitalSchema,
	nameSchema,
} from "@/shared/libs/validation";

export const checkupSchema = z
	.object({
		// 기본 정보
		name: nameSchema,
		birthDate: birthDateSchema,
		gender: genderSchema,
		checkupDate: checkupDateSchema,
		hospital: hospitalSchema,

		// 신체 계측
		height: decimalOnePlace(100, 250, ERROR_MESSAGES.measurement.height),
		weight: decimalOnePlace(0, 600, ERROR_MESSAGES.measurement.weight),
		bmi: decimalOnePlace(0, 100, ERROR_MESSAGES.measurement.bmi),
		waistCircumference: decimalOnePlace(
			20,
			250,
			ERROR_MESSAGES.measurement.waist,
		),
		systolicBp: decimalOnePlace(0, 300, ERROR_MESSAGES.measurement.systolic),
		diastolicBp: decimalOnePlace(0, 300, ERROR_MESSAGES.measurement.diastolic),

		// 혈액 검사
		hemoglobin: decimalOnePlace(0, 30, ERROR_MESSAGES.bloodTest.hemoglobin),
		fastingGlucose: decimalOnePlace(
			30,
			700,
			ERROR_MESSAGES.bloodTest.fastingGlucose,
		),
		serumCreatinine: decimalTwoPlaces(
			0,
			20,
			ERROR_MESSAGES.bloodTest.serumCreatinine,
		),
		egfr: decimalOnePlace(0, 200, ERROR_MESSAGES.bloodTest.gfr),
		ast: decimalOnePlace(0, 10000, ERROR_MESSAGES.bloodTest.ast),
		alt: decimalOnePlace(0, 10000, ERROR_MESSAGES.bloodTest.alt),
		gammaGtp: decimalOnePlace(0, 3000, ERROR_MESSAGES.bloodTest.ggt),
	})
	.refine(
		(data) => {
			// 둘 다 입력된 경우에만 검증
			if (data.systolicBp === undefined || data.diastolicBp === undefined)
				return true;
			return data.systolicBp > data.diastolicBp;
		},
		{
			message: ERROR_MESSAGES.measurement.bloodPressure,
			path: ["diastolicBp"],
		},
	);

// 폼 입력 타입 (transform 전 - string)
export type CheckupFormInput = z.input<typeof checkupSchema>;
// 폼 출력 타입 (transform 후 - number | undefined)
export type CheckupFormData = z.infer<typeof checkupSchema>;
