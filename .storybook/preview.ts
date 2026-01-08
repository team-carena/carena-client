import type { Preview } from "@storybook/react-vite";
import "@app/styles/global.css";

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		// 자동 문서화
		tags: ["autodocs"],
	},
};

export default preview;
