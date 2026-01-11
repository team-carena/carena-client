import { OverlayProvider } from "overlay-kit";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "@/app/App";

const rootElement = document.getElementById("root");

if (!rootElement) {
	throw new Error("Root element not found");
}

createRoot(rootElement).render(
	<StrictMode>
		<OverlayProvider>
			<App />
		</OverlayProvider>
	</StrictMode>,
);
