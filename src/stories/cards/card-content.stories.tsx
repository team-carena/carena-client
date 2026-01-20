import type { Meta, StoryObj } from "@storybook/react-vite";
import { ContentCard } from "@/shared/ui/cards/card-content";

const meta: Meta<typeof ContentCard> = {
	title: "card/ContentCard",
	component: ContentCard,
	tags: ["autodocs"],
	args: {
		variant: "default",
		children: (
			<>
				<ContentCard.Title>소제목</ContentCard.Title>
				<ContentCard.Content>
					내용입니다. 길이는 마구 길어져도 상관 없습니다(min 114px).
					{"\n"}양옆위아래 패딩 값 상관 있습니다.
				</ContentCard.Content>
				<ContentCard.Tags
					tags={["#태그", "#태그", "#태그", "#태그", "#태그"]}
				/>
			</>
		),
	},
	argTypes: {
		variant: {
			control: "select",
			options: ["default", "muted"],
			description: "카드 스타일 변형",
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

export const Default: Story = {
	args: {
		variant: "default",
	},
};

export const WithoutTitle: Story = {
	args: {
		children: (
			<>
				<ContentCard.Content>
					소제목 없는 케이스입니다. 본문이 상단 패딩부터 시작해야 합니다.
				</ContentCard.Content>
				<ContentCard.Tags tags={["#태그", "#태그", "#태그"]} />
			</>
		),
	},
};

export const Muted: Story = {
	args: {
		variant: "muted",
		children: (
			<>
				<ContentCard.Content>
					그림 아래 상자 케이스입니다. 배경색과 패딩이 다릅니다.
				</ContentCard.Content>
			</>
		),
	},
};

export const Multiple: Story = {
	render: () => (
		<div className="flex w-[375px] flex-col gap-[12px]">
			<ContentCard variant="default">
				<ContentCard.Title>소제목</ContentCard.Title>
				<ContentCard.Content>
					소제목 있는 케이스입니다. 길이는 길어져도 상관 없습니다
				</ContentCard.Content>
				<ContentCard.Tags
					tags={["#태그", "#태그", "#태그", "#태그", "#태그"]}
				/>
			</ContentCard>
			<ContentCard variant="default">
				<ContentCard.Content>
					소제목 없는 케이스입니다. 길이는 길어져도 상관 없습니다.
				</ContentCard.Content>
				<ContentCard.Tags tags={["#태그", "#태그", "#태그"]} />
			</ContentCard>
			<ContentCard variant="muted">
				<ContentCard.Content>
					이러쿵 저러쿵 내용입니다. 길이는 마구 길어져도 상관 없습니다.
					양옆위아래 패딩 값 상관 있습니다.
				</ContentCard.Content>
			</ContentCard>
		</div>
	),
};
