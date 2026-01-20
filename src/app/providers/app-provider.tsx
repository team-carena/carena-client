import { OverlayProvider } from "overlay-kit";
import { MainToaster } from "@/shared/ui/overlays/toast/toast";
import { AuthInitializerProvider } from "./auth-initializer-provider";
import { QueryProvider } from "./query-provider";
import { RouterProvider } from "./router-provider";

export const AppProvider = () => {
	return (
		<AuthInitializerProvider>
			<QueryProvider>
				<MainToaster />
				<OverlayProvider>
					<RouterProvider />
				</OverlayProvider>
			</QueryProvider>
		</AuthInitializerProvider>
	);
};
