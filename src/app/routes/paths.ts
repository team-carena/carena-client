export const ROUTE_PATH = {
	LAYOUT: "/",
	LOGIN: "/login",
	OAUTH_CALLBACK: "/oauth-callback",
	SIGNUP: "/signup",
	HOME: "/home",
	MY_PAGE: "/my-page",
	HEALTH_MENU_DETAIL: "/health-menu-detail",
	HEALTH_MENU: "/health-menu",
	HEALTH_TIP: "/health-tip",
	HEALTH_TIP_DETAIL: "/health-tip-detail",
	HEALTH_REPORT_DETAIL: "/health-report/:type",
	CHECKUP_RESULT: "/checkup-result",
} as const;

export type Routes = (typeof ROUTE_PATH)[keyof typeof ROUTE_PATH];
