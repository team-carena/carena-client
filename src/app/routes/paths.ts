export const ROUTE_PATH = {
	LAYOUT: "/",
	LOGIN: "/login",
	SIGNUP: "/signup",
	HOME: "/home",
	MY_PAGE: "/my-page",
	HEALTH_MENU_DETAIL: "/health-menu-detail",
	HEALTH_MENU: "/health-menu",
	HEALTH_TIP: "/health-tip",
	HEALTH_TIP_DETAIL: "/health-tip-detail",
	TEMP: "/temp",
	// 페이지 작업 시 추가
} as const;

export type Routes = (typeof ROUTE_PATH)[keyof typeof ROUTE_PATH];
