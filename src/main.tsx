import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "@/app/App";
import { AuthInitializer } from "./app/auth-initializer";

const rootElement = document.getElementById("root");

if (!rootElement) {
	throw new Error("Root element not found");
}

createRoot(rootElement).render(
	<StrictMode>
		<AuthInitializer>
			<App />
		</AuthInitializer>
	</StrictMode>,
);
