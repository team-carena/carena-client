import { trackPageView } from "@shared/libs/analytics";
import { useEffect } from "react";
import { RouterProvider as ReactRouterProvider } from "react-router";
import { router } from "../routes/router";

export const RouterProvider = () => {
	useEffect(() => {
		trackPageView(window.location.pathname);

		const unsubscribe = router.subscribe((state) => {
			trackPageView(state.location.pathname);
		});

		return unsubscribe;
	}, []);

	return <ReactRouterProvider router={router} />;
};
