import path from "node:path";
import { fileURLToPath } from "node:url";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import react from "@vitejs/plugin-react-swc";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vite";

const dirname =
	typeof __dirname !== "undefined"
		? __dirname
		: path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	plugins: [react()],
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
	test: {
		projects: [
			{
				extends: true,
				plugins: [
					storybookTest({
						configDir: path.join(dirname, ".storybook"),
					}),
				],
				test: {
					name: "storybook",
					browser: {
						enabled: true,
						headless: true,
						provider: playwright({}),
						instances: [
							{
								browser: "chromium",
							},
						],
					},
					setupFiles: [".storybook/vitest.setup.ts"],
				},
			},
		],
	},
});
