import "@app/styles/global.css";
import { ErrorBoundary } from "react-error-boundary";
import { MainToaster } from "@/shared/ui/toasts/toast";
import { AppProvider } from "./providers/app-provider";
import { GlobalErrorFallback } from "./ui/global-error-fallback";

export const App = () => {
	return (
		<ErrorBoundary FallbackComponent={GlobalErrorFallback}>
			<AppProvider />
			<MainToaster />
		</ErrorBoundary>
	);
};
