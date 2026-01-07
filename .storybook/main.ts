import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const config: StorybookConfig = {
	// 스토리북에서 사용할 스토리 파일 경로
	stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],

	// 사용할 스토리북 애드온
	addons: [
		"@chromatic-com/storybook",
		"@storybook/addon-vitest",
		"@storybook/addon-a11y",
		"@storybook/addon-docs",
	],

	framework: "@storybook/react-vite",

	viteFinal: async (config_, { configType }) =>
		mergeConfig(config_, {
			plugins: [tsconfigPaths()],
		}),

	// 정적 파일 경로
	staticDirs: ["../public"],

	// 사용자 데이터를 수집하지 않도록 설정
	core: {
		disableTelemetry: true,
	},

	// TypeScript Props 문서화 설정
	typescript: {
		check: false,
		// 컴포넌트에서 사용한 타입을 추출해 문서로 만들어주는 라이브러리
		reactDocgen: "react-docgen-typescript",
		reactDocgenTypescriptOptions: {
			shouldExtractLiteralValuesFromEnum: true,
			propFilter: (prop) =>
				prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
		},
	},
};
export default config;
