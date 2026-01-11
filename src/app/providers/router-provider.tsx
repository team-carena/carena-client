import { RouterProvider as ReactRouterProvider } from "react-router";
import { router } from "../routes/router";

export const RouterProvider = () => {
	return <ReactRouterProvider router={router} />;
};
