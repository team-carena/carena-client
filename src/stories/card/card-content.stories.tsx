import ContentCard from "@shared/ui/card/card-content";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof ContentCard> = {
	title: "card/ContentCard",
	component: ContentCard,
	tags: ["autodocs"],
	args: {
		subtitle: "소제목",
		content:
			"내용입니다. 길이는 마구 길어져도 상관 없습니다(min 114px).\n양옆위아래 패딩 값 상관 있습니다.",
		tags: ["#태그", "#태그", "#태그", "#태그", "#태그"],
	},
	argTypes: {
		subtitle: {
			control: "text",
			description: "소제목(있을 수도, 없을 수도 있음)",
		},
		content: {
			control: "text",
			description: "본문 내용",
		},
		tags: {
			control: "object",
			description: "태그 문자열 배열",
		},
	},
	decorators: [
		(Story) => (
			<div className="w-[375px]">
				<Story />
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof ContentCard>;

export const WithSubtitle: Story = {
	args: {
		subtitle: "소제목",
	},
};

export const WithoutSubtitle: Story = {
	args: {
		subtitle: undefined,
	},
};

export const Multiple: Story = {
	render: () => (
		<div className="flex flex-col gap-[12px] w-[375px]">
			<ContentCard
				subtitle="소제목"
				content="내용입니다. 길이는 마구 길어져도 상관 없습니다(min 114px)."
				tags={["#태그", "#태그", "#태그", "#태그", "#태그"]}
			/>
			<ContentCard
				content="subtitle 없는 케이스입니다. 본문이 상단 패딩(24px)부터 시작해야 합니다."
				tags={["#태그", "#태그", "#태그"]}
			/>
		</div>
	),
};
