import type { Preview } from "@storybook/react-vite";
import "@app/styles/global.css";

const preview: Preview = {
	// 자동 문서화
	tags: ["autodocs"],
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
};

export default preview;
