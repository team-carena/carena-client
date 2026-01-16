import type { Meta, StoryObj } from "@storybook/react-vite";
import type * as React from "react";
import { MemoryRouter } from "react-router";
import { NaviRow } from "@/shared/ui/navigations/navi-row";

/* 모바일 웹 레이아웃 wrapper */
const MobileWrapper = ({ children }: { children: React.ReactNode }) => (
	<div className="mx-auto w-full min-w-[37.5rem] max-w-[44rem] px-[2rem]">
		{children}
	</div>
);

const meta: Meta<typeof NaviRow> = {
	title: "navigations/NaviRow",
	component: NaviRow,
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
		to: {
			control: "text",
			description: "이동할 경로",
		},
	},
};

export default meta;
type Story = StoryObj<typeof NaviRow>;

export const Default: Story = {
	args: {
		label: "Text",
		to: "/example",
	},
};
