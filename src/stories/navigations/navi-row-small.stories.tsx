import { NaviRowSmall } from "@shared/ui/navigations/navi-row-small";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type * as React from "react";

/* 모바일 웹 레이아웃 wrapper */
const MobileWrapper = ({ children }: { children: React.ReactNode }) => (
	<div className="mx-auto w-full min-w-[37.5rem] max-w-[44rem] px-[2rem]">
		{children}
	</div>
);

const meta: Meta<typeof NaviRowSmall> = {
	title: "shared/navigations/NaviRowSmall",
	component: NaviRowSmall,
	tags: ["autodocs"],
	decorators: [
		(Story) => (
			<MobileWrapper>
				<Story />
			</MobileWrapper>
		),
	],
	argTypes: {
		label: {
			control: "text",
			description: "좌측에 표시되는 텍스트",
		},
		onClick: {
			action: "clicked",
			description: "Row 클릭 시 호출되는 이벤트",
		},
	},
};

export default meta;
type Story = StoryObj<typeof NaviRowSmall>;

export const Default: Story = {
	args: {
		label: "텍스트",
		actionLabel: "더보기",
	},
};
