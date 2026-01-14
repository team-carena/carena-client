import { Header } from "@shared/ui/navigations/Header";
import type { Meta, StoryObj } from "@storybook/react-vite";

/* 모바일 웹 레이아웃 wrapper */
const MobileWrapper = ({ children }: { children: React.ReactNode }) => (
	<div className="mx-auto w-full min-w-[37.5rem] max-w-[44rem]">{children}</div>
);

const meta: Meta<typeof Header> = {
	title: "shared/navigations/Header",
	component: Header,
	tags: ["autodocs"],
	decorators: [
		(Story) => (
			<MobileWrapper>
				<Story />
			</MobileWrapper>
		),
	],
	argTypes: {
		title: {
			control: "text",
			description: "가운데에 표시되는 페이지 타이틀",
		},
		showBack: {
			control: "boolean",
			description: "좌측 뒤로가기 아이콘 표시 여부",
		},
		showMy: {
			control: "boolean",
			description: "우측 My 아이콘 표시 여부",
		},
	},
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
	args: {
		title: "page",
	},
};

export const WithBack: Story = {
	args: {
		title: "page",
		showBack: true,
	},
};

export const MainPage: Story = {
	args: {
		showMy: true,
	},
};

export const OnlyLogo: Story = {
	args: {},
};
