import { MainToaster } from "@/shared/ui/toasts/toast";
import { QueryProvider } from "./query-provider";
import { RouterProvider } from "./router-provider";

export const AppProvider = () => {
	return (
		<QueryProvider>
			<RouterProvider />
			<MainToaster />
		</QueryProvider>
	);
};
