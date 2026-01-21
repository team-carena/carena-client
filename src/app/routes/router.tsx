import { HealthMenuPage } from "@pages/health-menu/health-menu";
import { MenuDetailPage } from "@pages/health-menu/health-menu-detail";
import type { HeaderVariant } from "@shared/ui/navigations/header";
import { createBrowserRouter, Navigate } from "react-router";
import { OauthCallBack } from "@/pages/auth/ui/oauth-callback";
import { HealthReportDetailPage } from "@/pages/health-report-detail/health-report-detail";
import { HealthTipPage } from "@/pages/health-tip/health-tip";
import { HealthTipDetailPage } from "@/pages/health-tip/health-tip-detail";
import { HomePage } from "@/pages/home/ui/home";
import { LoginPage } from "@/pages/login/ui/login";
import { MyPage } from "@/pages/my-page/my-page";
import { Signup } from "@/pages/signup/ui/signup";
import { Layout } from "./layout";
import { ROUTE_PATH } from "./paths";
import { ProtectedRoute } from "./protected-route";

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
	//
	{
		path: ROUTE_PATH.SIGNUP,
		element: <Signup />,
		handle: {
			header: "signup",
			title: "회원가입",
		} satisfies RouteHandle,
	},
	{
		path: ROUTE_PATH.OAUTH_CALLBACK,
		element: <OauthCallBack />,
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
						path: ROUTE_PATH.HEALTH_MENU_DETAIL,
						element: <MenuDetailPage />,
						handle: {
							header: "back",
							title: "건강 식단",
						} satisfies RouteHandle,
					},
					{
						path: ROUTE_PATH.HEALTH_MENU,
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
						path: ROUTE_PATH.HEALTH_REPORT_DETAIL,
						element: <HealthReportDetailPage />,
						handle: {
							header: "back",
							// title은 layout에서 type 보고 동적으로 처리
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
