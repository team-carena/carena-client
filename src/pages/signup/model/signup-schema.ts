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

// 이름 유효성 검사: 완성형 한글만 허용
const isValidName = (name: string): boolean => {
	if (name === "") return true;
	const validPattern = /^[가-힣\s]+$/;
	return validPattern.test(name);
};

// 에러 메시지 상수
const ERROR_MESSAGES = {
	name: {
		required: "이름을 입력해 주세요.",
		maxLength: "이름은 30자 이하로 입력해 주세요.",
		invalidChar: "한글만 입력 가능해요.",
	},
	birthDate: {
		invalidYear: "1960년~2007년 사이의 연도를 입력해 주세요.",
		invalidDate: "올바른 날짜를 입력해 주세요.",
	},
};

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

export const signupSchema = z.object({
	name: z
		.string()
		.trim()
		.min(1, ERROR_MESSAGES.name.required)
		.max(30, ERROR_MESSAGES.name.maxLength)
		.refine((val) => isValidName(val), {
			message: ERROR_MESSAGES.name.invalidChar,
		}),
	birthDate: birthDateSchema,
	gender: z.enum(["MALE", "FEMALE"]),
});

// 폼 입력 타입 (transform 전 - string)
export type SignupFormInput = z.input<typeof signupSchema>;
// 폼 출력 타입 (transform 후)
export type SignupFormData = z.infer<typeof signupSchema>;
