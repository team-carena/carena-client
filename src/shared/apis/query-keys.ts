// Query Key Factory

export const queryKeys = {
	// Member
	member: {
		all: ["member"] as const,
		info: () => [...queryKeys.member.all, "info"] as const,
		myPage: () => [...queryKeys.member.all, "myPage"] as const,
	},

	// Health Tips
	healthTip: {
		all: ["healthTip"] as const,
		lists: () => [...queryKeys.healthTip.all, "list"] as const,
		list: (params?: { page?: number; size?: number }) =>
			[...queryKeys.healthTip.lists(), params] as const,
		details: () => [...queryKeys.healthTip.all, "detail"] as const,
		detail: (id: string) => [...queryKeys.healthTip.details(), id] as const,
		ticker: () => [...queryKeys.healthTip.all, "ticker"] as const,
	},

	// Health Report
	healthReport: {
		all: ["healthReport"] as const,
		entire: (id?: string) =>
			[...queryKeys.healthReport.all, "entire", id] as const,
		dateList: (params?: { page?: number; size?: number }) =>
			[...queryKeys.healthReport.all, "dateList", params] as const,
		history: {
			all: () => [...queryKeys.healthReport.all, "history"] as const,
			weight: () =>
				[...queryKeys.healthReport.history.all(), "weight"] as const,
			height: () =>
				[...queryKeys.healthReport.history.all(), "height"] as const,
			bmi: () => [...queryKeys.healthReport.history.all(), "bmi"] as const,
			waistCircumference: () =>
				[
					...queryKeys.healthReport.history.all(),
					"waistCircumference",
				] as const,
			systolicBp: () =>
				[...queryKeys.healthReport.history.all(), "systolicBp"] as const,
			diastolicBp: () =>
				[...queryKeys.healthReport.history.all(), "diastolicBp"] as const,
			hemoglobin: () =>
				[...queryKeys.healthReport.history.all(), "hemoglobin"] as const,
			fastingGlucose: () =>
				[...queryKeys.healthReport.history.all(), "fastingGlucose"] as const,
			serumCreatinine: () =>
				[...queryKeys.healthReport.history.all(), "serumCreatinine"] as const,
			egfr: () => [...queryKeys.healthReport.history.all(), "egfr"] as const,
			ast: () => [...queryKeys.healthReport.history.all(), "ast"] as const,
			alt: () => [...queryKeys.healthReport.history.all(), "alt"] as const,
			gammaGtp: () =>
				[...queryKeys.healthReport.history.all(), "gammaGtp"] as const,
		},
	},

	// Diet
	diet: {
		all: ["diet"] as const,
		lists: () => [...queryKeys.diet.all, "list"] as const,
		list: (params?: { page?: number; size?: number }) =>
			[...queryKeys.diet.lists(), params] as const,
		details: () => [...queryKeys.diet.all, "detail"] as const,
		detail: (id: string) => [...queryKeys.diet.details(), id] as const,
	},

	// Recommended Meal
	recommendedMeal: {
		all: ["recommendedMeal"] as const,
		latest: () => [...queryKeys.recommendedMeal.all, "latest"] as const,
	},
} as const;
