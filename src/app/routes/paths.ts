export const ROUTE_PATH = {
	LAYOUT: "/",
	LOGIN: "/login",
	HOME: "/home",
	MY_PAGE: "/my-page",
	HEALTH_TIP_DETAIL: "/health-tip-detail",
	// 페이지 작업 시 추가
} as const;

export type Routes = (typeof ROUTE_PATH)[keyof typeof ROUTE_PATH];
