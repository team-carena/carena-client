import { z } from "zod";
import { isValidDate } from "../date";
import { isValidName } from "../name";
import { ERROR_MESSAGES } from "./error-messages";

// 이름 스키마
export const nameSchema = z
	.string()
	.trim()
	.min(1, ERROR_MESSAGES.name.required)
	.max(30, ERROR_MESSAGES.name.maxLength)
	.refine((val) => isValidName(val), {
		message: ERROR_MESSAGES.name.invalidChar,
	});

// 생년월일 스키마
export const birthDateSchema = z
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
export const checkupDateSchema = z
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

// 성별 스키마
export const genderSchema = z.enum(["MALE", "FEMALE"]);

// 숫자 문자열을 number로 변환 (빈 문자열은 undefined)
const toNumber = (val: string) => (val === "" ? undefined : Number(val));

// 소수점 첫째자리까지 허용 (정수 또는 x.x 형태)
export const decimalOnePlace = (min: number, max: number, errorMsg: string) =>
	z
		.string()
		.refine((val) => val === "" || /^\d+(\.\d)?$/.test(val), {
			message: ERROR_MESSAGES.decimal.onePlace,
		})
		.transform(toNumber)
		.pipe(z.number().min(min, errorMsg).max(max, errorMsg).optional());

// 소수점 둘째자리까지 허용 (정수, x.x, x.xx 형태)
export const decimalTwoPlaces = (min: number, max: number, errorMsg: string) =>
	z
		.string()
		.refine((val) => val === "" || /^\d+(\.\d{1,2})?$/.test(val), {
			message: ERROR_MESSAGES.decimal.twoPlaces,
		})
		.transform(toNumber)
		.pipe(z.number().min(min, errorMsg).max(max, errorMsg).optional());

// 병원명 스키마
export const hospitalSchema = z
	.string()
	.max(100, ERROR_MESSAGES.hospital.maxLength)
	.refine((val) => val === "" || /^[가-힣a-zA-Z0-9\s]+$/.test(val), {
		message: ERROR_MESSAGES.hospital.invalidChar,
	})
	.optional();
