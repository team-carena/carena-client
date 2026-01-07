import type { Preview } from "@storybook/react-vite";
import "@styles/global.css";

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
