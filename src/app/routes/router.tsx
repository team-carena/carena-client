import { createBrowserRouter, Navigate } from "react-router";
import { Layout } from "./layout";
import { ROUTE_PATH } from "./paths";

export const router = createBrowserRouter([
	{
		path: ROUTE_PATH.LAYOUT,
		element: <Layout />,
		children: [
			{
				index: true,
				element: <Navigate to={ROUTE_PATH.HOME} replace />,
			},
			{
				path: "*",
				element: <></>, // 추후 NotFound 컴포넌트 추가
			},
			{
				path: ROUTE_PATH.HOME,
				element: <></>,
			},
			{
				path: ROUTE_PATH.MY_PAGE,
				element: <></>,
			},
		],
	},
]);
