export const ERROR_MESSAGES = {
	name: {
		required: "이름을 입력해 주세요.",
		maxLength: "이름은 30자 이하로 입력해 주세요.",
		invalidChar: "한글만 입력 가능해요.",
	},
	birthDate: {
		invalidYear: "1956년~2007년 사이의 연도를 입력해 주세요.",
		invalidDate: "올바른 날짜를 입력해 주세요.",
	},
	checkupDate: {
		required: "검진일자를 입력해 주세요.",
		invalidYear: "2000년~2026년 사이의 연도를 입력해 주세요.",
		invalidDate: "올바른 날짜를 입력해 주세요.",
	},
	hospital: {
		required: "검진병원을 입력해 주세요.",
		maxLength: "병원명은 100자 이하로 입력해 주세요.",
		invalidChar: "한글, 영어, 숫자만 입력 가능해요.",
	},
	measurement: {
		default: "수치를 다시 한 번 확인해주세요.",
		bloodPressure: "수축기 혈압이 이완기 혈압보다 커야 해요.",
	},
	bloodTest: {
		default: "수치를 다시 한 번 확인해주세요.",
	},
	decimal: {
		onlyNumber: "숫자만 입력 가능해요.",
		onePlace: "소수점 첫째자리까지만 입력 가능해요.",
		twoPlaces: "소수점 둘째자리까지만 입력 가능해요.",
	},
};
