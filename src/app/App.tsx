import "@app/styles/global.css";
import { ErrorBoundary } from "react-error-boundary";
import { LargeBadge } from "@/shared/ui/badges/large-badge";
import Chip from "@/shared/ui/chips/chip";
import Tag from "@/shared/ui/tags/tag";
// import { SmallBadge } from "@/shared/ui/badge/small-badge";
// import { AppProvider } from "./providers/app-provider";
import { GlobalErrorFallback } from "./ui/global-error-fallback";

export const App = () => {
	return (
		<ErrorBoundary FallbackComponent={GlobalErrorFallback}>
			<Tag>#태그</Tag>
		</ErrorBoundary>
	);
};
