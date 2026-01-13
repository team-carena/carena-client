import { OverlayProvider } from "overlay-kit";
import { QueryProvider } from "./query-provider";
import { RouterProvider } from "./router-provider";

export const AppProvider = () => {
	return (
		<QueryProvider>
			<OverlayProvider>
				<RouterProvider />
			</OverlayProvider>
		</QueryProvider>
	);
};
