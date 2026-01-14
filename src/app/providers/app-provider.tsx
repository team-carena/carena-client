import { OverlayProvider } from "overlay-kit";
import { MainToaster } from "@/shared/ui/overlays/toast/toast";
import { QueryProvider } from "./query-provider";
import { RouterProvider } from "./router-provider";

export const AppProvider = () => {
	return (
		<QueryProvider>
			<MainToaster />
			<OverlayProvider>
				<RouterProvider />
			</OverlayProvider>
		</QueryProvider>
	);
};
