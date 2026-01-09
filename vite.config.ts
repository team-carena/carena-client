import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		svgr({
			svgrOptions: {
				plugins: ["@svgr/plugin-svgo", "@svgr/plugin-jsx"],
				svgoConfig: { floatPrecision: 2 },
			},
		}),
		react(),
		tailwindcss(),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"@app": path.resolve(__dirname, "./src/app"),
			"@pages": path.resolve(__dirname, "./src/pages"),
			"@widgets": path.resolve(__dirname, "./src/widgets"),
			"@shared": path.resolve(__dirname, "./src/shared"),
			"@apis": path.resolve(__dirname, "./src/shared/apis"),
			"@svg": path.resolve(__dirname, "./src/shared/assets/svg"),
			"@img": path.resolve(__dirname, "./src/shared/assets/img"),
			"@styles": path.resolve(__dirname, "./src/shared/styles"),
			"@libs": path.resolve(__dirname, "./src/shared/libs"),
			"@configs": path.resolve(__dirname, "./src/shared/configs"),
			"@ui": path.resolve(__dirname, "./src/shared/ui"),
		},
	},
});
