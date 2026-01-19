import { z } from "zod";

// 윤년 체크 함수
const isLeapYear = (year: number): boolean =>
	(year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

// 해당 월의 최대 일수 반환
const getDaysInMonth = (year: number, month: number): number => {
	const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	if (month === 2 && isLeapYear(year)) return 29;
	return daysInMonth[month - 1];
};

// 유효한 날짜인지 검사
const isValidDate = (year: number, month: number, day: number): boolean => {
	if (month < 1 || month > 12) return false;
	if (day < 1 || day > getDaysInMonth(year, month)) return false;
	return true;
};

// 이름 유효성 검사: 완성형 한글/영어만 허용
// 가-힣 범위는 완성형 한글만 포함 (ㄱ-ㅎ 자음, ㅏ-ㅣ 모음은 포함 X)
// 빈 문자열은 true 반환 → min(1)에서 처리
const isValidName = (name: string): boolean => {
	if (name === "") return true;
	const validPattern = /^[가-힣a-zA-Z\s]+$/;
	return validPattern.test(name);
};

// 에러 메시지 상수
const ERROR_MESSAGES = {
	name: {
		required: "이름을 입력해 주세요.",
		maxLength: "이름은 30자 이하로 입력해 주세요.",
		invalidChar: "한글 또는 영어만 입력 가능해요.",
	},
	birthDate: {
		invalidYear: "1960년~2007년 사이의 연도를 입력해 주세요.",
		invalidDate: "올바른 날짜를 입력해 주세요.",
	},
	checkupDate: {
		invalidYear: "2000년~2026년 사이의 연도를 입력해 주세요.",
		invalidDate: "올바른 날짜를 입력해 주세요.",
	},
	hospital: {
		maxLength: "병원명은 100자 이하로 입력해 주세요.",
		invalidChar: "한글, 영어, 숫자만 입력 가능해요.",
	},
	measurement: {
		height: "100~250 사이의 값을 입력해 주세요.",
		weight: "0~600 사이의 값을 입력해 주세요.",
		bmi: "0~100 사이의 값을 입력해 주세요.",
		waist: "20~250 사이의 값을 입력해 주세요.",
		systolic: "0~300 사이의 값을 입력해 주세요.",
		diastolic: "0~300 사이의 값을 입력해 주세요.",
		bloodPressure: "수축기 혈압이 이완기 혈압보다 커야 해요.",
	},
	bloodTest: {
		hemoglobin: "0~30 사이의 값을 입력해 주세요.",
		fastingGlucose: "30~700 사이의 값을 입력해 주세요.",
		serumCreatinine: "0~20 사이의 값을 입력해 주세요.",
		gfr: "0~200 사이의 값을 입력해 주세요.",
		ast: "0~10,000 사이의 값을 입력해 주세요.",
		alt: "0~10,000 사이의 값을 입력해 주세요.",
		ggt: "0~3,000 사이의 값을 입력해 주세요.",
	},
	decimal: {
		onePlace: "소수점 첫째자리까지만 입력 가능해요.",
		twoPlaces: "소수점 둘째자리까지만 입력 가능해요.",
	},
};

// 숫자 문자열을 number로 변환 (빈 문자열은 undefined)
const toNumber = (val: string) => (val === "" ? undefined : Number(val));

// 소수점 첫째자리까지 허용 (정수 또는 x.x 형태)
const decimalOnePlace = (min: number, max: number, errorMsg: string) =>
	z
		.string()
		.refine((val) => val === "" || /^\d+(\.\d)?$/.test(val), {
			message: ERROR_MESSAGES.decimal.onePlace,
		})
		.transform(toNumber)
		.pipe(z.number().min(min, errorMsg).max(max, errorMsg).optional());

// 소수점 둘째자리까지 허용 (정수, x.x, x.xx 형태)
const decimalTwoPlaces = (min: number, max: number, errorMsg: string) =>
	z
		.string()
		.refine((val) => val === "" || /^\d+(\.\d{1,2})?$/.test(val), {
			message: ERROR_MESSAGES.decimal.twoPlaces,
		})
		.transform(toNumber)
		.pipe(z.number().min(min, errorMsg).max(max, errorMsg).optional());

// 생년월일 스키마
const birthDateSchema = z
	.object({
		year: z.string(),
		month: z.string(),
		day: z.string(),
	})
	.refine(
		(data) => {
			if (!data.year) return true;
			const year = Number(data.year);
			return year >= 1960 && year <= 2007;
		},
		{ message: ERROR_MESSAGES.birthDate.invalidYear },
	)
	.refine(
		(data) => {
			if (!data.year || !data.month || !data.day) return true;
			const year = Number(data.year);
			const month = Number(data.month);
			const day = Number(data.day);
			return isValidDate(year, month, day);
		},
		{ message: ERROR_MESSAGES.birthDate.invalidDate },
	);

// 검진일자 스키마
const checkupDateSchema = z
	.object({
		year: z.string(),
		month: z.string(),
		day: z.string(),
	})
	.refine(
		(data) => {
			if (!data.year) return true;
			const year = Number(data.year);
			return year >= 2000 && year <= 2026;
		},
		{ message: ERROR_MESSAGES.checkupDate.invalidYear },
	)
	.refine(
		(data) => {
			if (!data.year || !data.month || !data.day) return true;
			const year = Number(data.year);
			const month = Number(data.month);
			const day = Number(data.day);
			return isValidDate(year, month, day);
		},
		{ message: ERROR_MESSAGES.checkupDate.invalidDate },
	);

export const signupSchema = z
	.object({
		// 기본 정보
		name: z
			.string()
			.min(1, ERROR_MESSAGES.name.required)
			.max(30, ERROR_MESSAGES.name.maxLength)
			.refine((val) => isValidName(val), {
				message: ERROR_MESSAGES.name.invalidChar,
			}),

		birthDate: birthDateSchema,
		gender: z.enum(["male", "female"]),
		checkupDate: checkupDateSchema,

		hospital: z
			.string()
			.max(100, ERROR_MESSAGES.hospital.maxLength)
			.refine((val) => val === "" || /^[가-힣a-zA-Z0-9\s]+$/.test(val), {
				message: ERROR_MESSAGES.hospital.invalidChar,
			})
			.optional(),

		// 신체 계측
		height: decimalOnePlace(100, 250, ERROR_MESSAGES.measurement.height),
		weight: decimalOnePlace(0, 600, ERROR_MESSAGES.measurement.weight),
		bmi: decimalOnePlace(0, 100, ERROR_MESSAGES.measurement.bmi),
		waist: decimalOnePlace(20, 250, ERROR_MESSAGES.measurement.waist),
		systolic: decimalOnePlace(0, 300, ERROR_MESSAGES.measurement.systolic),
		diastolic: decimalOnePlace(0, 300, ERROR_MESSAGES.measurement.diastolic),

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
		gfr: decimalOnePlace(0, 200, ERROR_MESSAGES.bloodTest.gfr),
		ast: decimalOnePlace(0, 10000, ERROR_MESSAGES.bloodTest.ast),
		alt: decimalOnePlace(0, 10000, ERROR_MESSAGES.bloodTest.alt),
		ggt: decimalOnePlace(0, 3000, ERROR_MESSAGES.bloodTest.ggt),
	})
	.refine(
		(data) => {
			// 둘 다 입력된 경우에만 검증
			if (data.systolic === undefined || data.diastolic === undefined)
				return true;
			return data.systolic > data.diastolic;
		},
		{
			message: ERROR_MESSAGES.measurement.bloodPressure,
			path: ["diastolic"], // 이완기 필드에 에러 표시
		},
	);

// 폼 입력 타입 (transform 전 - string)
export type SignupFormInput = z.input<typeof signupSchema>;
// 폼 출력 타입 (transform 후 - number | undefined)
export type SignupFormData = z.infer<typeof signupSchema>;
