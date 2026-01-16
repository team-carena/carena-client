import type { Meta, StoryObj } from "@storybook/react-vite";
import type * as React from "react";
import { MemoryRouter } from "react-router";
import { NaviRowSmall } from "@/shared/ui/navigations/navi-row-small";

/* 모바일 웹 레이아웃 wrapper */
const MobileWrapper = ({ children }: { children: React.ReactNode }) => (
	<div className="mx-auto w-full min-w-[37.5rem] max-w-[44rem] px-[2rem]">
		{children}
	</div>
);

const meta: Meta<typeof NaviRowSmall> = {
	title: "navigations/NaviRowSmall",
	component: NaviRowSmall,
	tags: ["autodocs"],
	decorators: [
		(Story) => (
			<MemoryRouter>
				<MobileWrapper>
					<Story />
				</MobileWrapper>
			</MemoryRouter>
		),
	],
	argTypes: {
		label: {
			control: "text",
			description: "좌측에 표시되는 텍스트",
		},
		actionLabel: {
			control: "text",
			description: "우측 액션 텍스트",
		},
		to: {
			control: "text",
			description: "이동할 경로",
		},
	},
};

export default meta;
type Story = StoryObj<typeof NaviRowSmall>;

export const Default: Story = {
	args: {
		label: "Text",
		actionLabel: "더보기",
		to: "/example",
	},
};
