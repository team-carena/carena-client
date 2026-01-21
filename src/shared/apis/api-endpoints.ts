// api 엔드포인트

export const API_ENDPOINTS = {
	// 건강팁 큐레이션
	healthTip: {
		list: "/api/v1/health-tip",
		detail: (healthTipId: string) => `/api/v1/health-tip/${healthTipId}`,
		ticker: "/api/v1/health-tip/ticker",
	},

	// 식단 관리
	diet: {
		list: "/api/v1/diet",
		detail: (id: string) => `/api/v1/diet/${id}`,
	},

	// 건강 검진 결과
	healthReport: {
		create: "/api/v1/health-report",
		ocr: "/api/v1/health-report/ocr",
		entire: (healthReportId: string) =>
			`/api/v1/health-report/${healthReportId}`,
		dates: "/api/v1/health-report/dates",
		measurement: {
			weight: "/api/v1/health-report/measurement/weight",
			waistCircumference:
				"/api/v1/health-report/measurement/waist-circumference",
			height: "/api/v1/health-report/measurement/height",
			bmi: "/api/v1/health-report/measurement/bmi",
		},
		liver: {
			gammaGtp: "/api/v1/health-report/liver/gamma-gtp",
			ast: "/api/v1/health-report/liver/ast",
			alt: "/api/v1/health-report/liver/alt",
		},
		kidney: {
			serumCreatinine: "/api/v1/health-report/kidney/serum-creatinine",
			egfr: "/api/v1/health-report/kidney/egfr",
		},
		diabetes: {
			fastingGlucose: "/api/v1/health-report/diabetes/fasting-glucose",
		},
		bloodPressure: {
			systolic: "/api/v1/health-report/blood-pressure/systolic",
			diastolic: "/api/v1/health-report/blood-pressure/diastolic",
		},
		anemia: {
			hemoglobin: "/api/v1/health-report/anemia/hemoglobin",
		},
	},

	// 멤버 관리
	member: {
		tokens: "/api/v1/member/tokens",
		tokenRefresh: "/api/v1/member/token/refresh",
		signup: "/api/v1/member/signup",
		logout: "/api/v1/member/logout",
		myPage: "/api/v1/member/my-page",
		myInfo: "/api/v1/member/my-info",
	},

	// 추천 식단
	recommendedMeal: {
		recommended: "/api/v1/recommend",
	},
} as const;
