import { createBrowserRouter, Navigate } from "react-router";
import { Layout } from "./layout";
import { routePath } from "./paths";

export const router = createBrowserRouter([
	{
		path: routePath.LAYOUT,
		element: <Layout />,
		children: [
			{
				index: true,
				element: <Navigate to={routePath.HOME} replace />,
			},
			{
				path: routePath.HOME,
				element: <></>,
			},
			{
				path: routePath.MY_PAGE,
				element: <></>,
			},
		],
	},
]);
