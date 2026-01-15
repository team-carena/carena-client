import { createBrowserRouter, Navigate } from "react-router";
import { HomePage } from "@/pages/home/ui/home";
import { MyPage } from "@/pages/my-page/my-page";
import { Layout } from "./layout";
import { ROUTE_PATH } from "./paths";
import { ProtectedRoute } from "./protected-route";

export const router = createBrowserRouter([
	{
		path: ROUTE_PATH.LOGIN,
		element: <></>,
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
					},
					{
						path: ROUTE_PATH.MY_PAGE,
						element: <MyPage />,
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
