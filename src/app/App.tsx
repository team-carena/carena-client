import "@app/styles/global.css";
import { ErrorBoundary } from "react-error-boundary";
import { LargeBadge } from "@/shared/ui/badge/large-badge";
// import { SmallBadge } from "@/shared/ui/badge/small-badge";
// import { AppProvider } from "./providers/app-provider";
import { GlobalErrorFallback } from "./ui/global-error-fallback";

export const App = () => {
	return (
		<ErrorBoundary FallbackComponent={GlobalErrorFallback}>
			<LargeBadge variant="normal">정상A</LargeBadge>
		</ErrorBoundary>
	);
};
