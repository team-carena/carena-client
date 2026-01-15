import { SelectList } from "@shared/ui/navigations/SelectList";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type * as React from "react";

/* 모바일 웹 레이아웃 wrapper */
const MobileWrapper = ({ children }: { children: React.ReactNode }) => (
	<div className="mx-auto w-full min-w-[37.5rem] max-w-[44rem] px-[2rem]">
		{children}
	</div>
);

const meta: Meta<typeof SelectList> = {
	title: "shared/navigations/SelectList",
	component: SelectList,
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
			description: "리스트에 표시되는 텍스트",
		},
		onClick: {
			action: "clicked",
			description: "리스트 클릭 시 호출되는 이벤트",
		},
	},
};

export default meta;
type Story = StoryObj<typeof SelectList>;

export const Default: Story = {
	args: {
		label: "텍스트",
	},
};
