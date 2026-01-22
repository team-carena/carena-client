export const ROUTE_PATH = {
	LAYOUT: "/",
	LOGIN: "/login",
	OAUTH_CALLBACK: "/oauth-callback",
	SIGNUP: "/signup",
	HOME: "/home",
	MY_PAGE: "/my-page",
	HEALTH_DIET_DETAIL: "/health-diet-detail/:healthDietId",
	HEALTH_DIET: "/health-diet",
	HEALTH_TIP: "/health-tip",
	HEALTH_TIP_DETAIL: "/health-tip-detail/:healthTipId",
	HEALTH_REPORT_DETAIL: "/health-report/:type",
	// 페이지 작업 시 추가
	CHECKUP_RESULT: "/checkup-result",
} as const;

export type Routes = (typeof ROUTE_PATH)[keyof typeof ROUTE_PATH];
