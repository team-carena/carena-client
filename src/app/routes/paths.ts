export const routePath = {
	LAYOUT: "/",
	HOME: "/home",
	MY_PAGE: "/my-page",
	// 페이지 작업 시 추가
} as const;

export type Routes = (typeof routePath)[keyof typeof routePath];
