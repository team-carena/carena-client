export const ROUTE_PATH = {
	LAYOUT: "/",
	LOGIN: "/login",
	OAUTH_CALLBACK: "/oauth-callback",
	SIGNUP: "/signup",
	SIGNUP_TOS: "/signup/tos",
	HOME: "/home",
	MY_PAGE: "/my-page",
	HEALTH_DIET_DETAIL: "/health-diet-detail/:healthDietId",
	HEALTH_DIET: "/health-diet",
	HEALTH_TIP: "/health-tip",
	HEALTH_TIP_DETAIL: "/health-tip-detail/:healthTipId",
	HEALTH_REPORT_DETAIL: "/health-report/:type",
	CHECKUP_RESULT: "/checkup-result",
	CHECKUP_RESULT_EDIT: "/checkup-result-edit",
} as const;

export type Routes = (typeof ROUTE_PATH)[keyof typeof ROUTE_PATH];
