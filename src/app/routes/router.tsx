import { HealthMenuPage } from "@pages/menu/menu";
import { MenuDetailPage } from "@pages/menu/menu-detail";
import { createBrowserRouter, Navigate } from "react-router";
import { HealthTipPage } from "@/pages/health-tip/health-tip";
import { HealthTipDetailPage } from "@/pages/health-tip/health-tip-detail";
import { HomePage } from "@/pages/home/ui/home";
import { LoginPage } from "@/pages/login/ui/login";
import { MyPage } from "@/pages/my-page/my-page";
import { Layout } from "./layout";
import { ROUTE_PATH } from "./paths";
import { ProtectedRoute } from "./protected-route";

/**
 * 헤더 변형 타입
 * - "main": 메인 페이지용 (로고 + 마이페이지 아이콘)
 * - "back": 서브 페이지용 (뒤로가기 + 타이틀)
 * - "none": 헤더 없음
 */
export type HeaderVariant = "main" | "back" | "none";

/**
 * 라우트 핸들 인터페이스
 * - useMatches()로 현재 라우트의 handle을 가져와서 Layout에서 헤더를 동적으로 렌더링
 */
export interface RouteHandle {
	header?: HeaderVariant;
	title?: string;
}

export const router = createBrowserRouter([
	{
		path: ROUTE_PATH.LOGIN,
		element: <LoginPage />,
	},
	{
		element: <ProtectedRoute />,
		children: [
			{
				path: ROUTE_PATH.LAYOUT,
				element: <Layout />,
				children: [
					{
						index: true,
						element: <Navigate to={ROUTE_PATH.HOME} replace />,
					},
					{
						path: ROUTE_PATH.HOME,
						element: <HomePage />,
						handle: { header: "main" } satisfies RouteHandle,
					},
					{
						path: ROUTE_PATH.MY_PAGE,
						element: <MyPage />,
						handle: {
							header: "back",
							title: "마이페이지",
						} satisfies RouteHandle,
					},
					{
						path: ROUTE_PATH.MENU_DETAIL,
						element: <MenuDetailPage />,
						handle: {
							header: "back",
							title: "메뉴 상세",
						} satisfies RouteHandle,
					},
					{
						path: ROUTE_PATH.MENU,
						element: <HealthMenuPage />,
						handle: {
							header: "back",
							title: "건강 식단",
						} satisfies RouteHandle,
					},
					{
						path: ROUTE_PATH.HEALTH_TIP,
						element: <HealthTipPage />,
						handle: {
							header: "back",
							title: "생활 속 건강 팁",
						} satisfies RouteHandle,
					},
					{
						path: ROUTE_PATH.HEALTH_TIP_DETAIL,
						element: <HealthTipDetailPage />,
						handle: {
							header: "back",
							title: "건강 팁 상세",
						} satisfies RouteHandle,
					},
					{
						path: "*",
						element: <></>, // TODO: 추후 NotFound 컴포넌트 추가
					},
				],
			},
		],
	},
]);
