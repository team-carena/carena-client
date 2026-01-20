export const ERROR_MESSAGES = {
	name: {
		required: "이름을 입력해 주세요.",
		maxLength: "이름은 30자 이하로 입력해 주세요.",
		invalidChar: "한글만 입력 가능해요.",
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
