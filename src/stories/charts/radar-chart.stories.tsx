import {
	RADAR_CHART_MAP,
	RadarChart,
} from "@shared/ui/charts/radar-chart/radar-chart";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof RadarChart> = {
	title: "charts/RadarChart",
	component: RadarChart,
	tags: ["autodocs"],
	argTypes: {
		data: {
			description: "차트에 표시할 데이터 배열 (label, riskLevel)",
		},
	},
};

export default meta;
type Story = StoryObj<typeof RadarChart>;

export const Default: Story = {
	render: () => (
		<RadarChart
			data={[
				{ label: "혈압", riskLevel: RADAR_CHART_MAP["정상"] },
				{ label: "빈혈", riskLevel: RADAR_CHART_MAP["경계"] },
				{ label: "신장질환", riskLevel: RADAR_CHART_MAP["위험"] },
				{ label: "간장질환", riskLevel: RADAR_CHART_MAP["정상"] },
				{ label: "비만", riskLevel: RADAR_CHART_MAP["경계"] },
				{ label: "당뇨", riskLevel: RADAR_CHART_MAP["위험"] },
			]}
		/>
	),
};

export const AllNormal: Story = {
	render: () => (
		<RadarChart
			data={[
				{ label: "혈압", riskLevel: RADAR_CHART_MAP["정상"] },
				{ label: "빈혈", riskLevel: RADAR_CHART_MAP["정상"] },
				{ label: "신장질환", riskLevel: RADAR_CHART_MAP["정상"] },
				{ label: "간장질환", riskLevel: RADAR_CHART_MAP["정상"] },
				{ label: "비만", riskLevel: RADAR_CHART_MAP["정상"] },
				{ label: "당뇨", riskLevel: RADAR_CHART_MAP["정상"] },
			]}
		/>
	),
};

export const AllWarning: Story = {
	render: () => (
		<RadarChart
			data={[
				{ label: "혈압", riskLevel: RADAR_CHART_MAP["경계"] },
				{ label: "빈혈", riskLevel: RADAR_CHART_MAP["경계"] },
				{ label: "신장질환", riskLevel: RADAR_CHART_MAP["경계"] },
				{ label: "간장질환", riskLevel: RADAR_CHART_MAP["경계"] },
				{ label: "비만", riskLevel: RADAR_CHART_MAP["경계"] },
				{ label: "당뇨", riskLevel: RADAR_CHART_MAP["경계"] },
			]}
		/>
	),
};

export const AllDanger: Story = {
	render: () => (
		<RadarChart
			data={[
				{ label: "혈압", riskLevel: RADAR_CHART_MAP["위험"] },
				{ label: "빈혈", riskLevel: RADAR_CHART_MAP["위험"] },
				{ label: "신장질환", riskLevel: RADAR_CHART_MAP["위험"] },
				{ label: "간장질환", riskLevel: RADAR_CHART_MAP["위험"] },
				{ label: "비만", riskLevel: RADAR_CHART_MAP["위험"] },
				{ label: "당뇨", riskLevel: RADAR_CHART_MAP["위험"] },
			]}
		/>
	),
};
