import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "@/app/App";
import { QueryProvider } from "@/app/providers/query-provider";

const rootElement = document.getElementById("root");

if (!rootElement) {
	throw new Error("Root element not found");
}

createRoot(rootElement).render(
	<StrictMode>
		<QueryProvider>
			<App />
		</QueryProvider>
	</StrictMode>,
);
