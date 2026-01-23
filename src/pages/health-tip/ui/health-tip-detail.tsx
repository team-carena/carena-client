import { useParams } from "react-router";
import { useHealthTipDetail } from "@/pages/health-tip/apis/queries/use-health-tip-detail";
import { ContentCard } from "@/shared/ui/cards/card-content";
import CardTip from "@/shared/ui/cards/card-tip";

export const HealthTipDetailPage = () => {
	const { healthTipId } = useParams();
	const { data, isPending, isError } = useHealthTipDetail(healthTipId ?? "");
	const hashtags = (data?.hashtags ?? []).map((tag) =>
		tag.startsWith("#") ? tag : `#${tag}`,
	);

	if (isPending) {
		// TODO: 로딩스피너 적용
		return null;
	}

	if (isError || !data) {
		return (
			<div className="px-[2rem] py-[2.4rem]">
				<p className="body04-r-14 text-gray-900">
					건강팁을 불러오지 못했습니다.
				</p>
			</div>
		);
	}

	return (
		<div className="px-[2rem] py-[2.4rem]">
			<section>
				<CardTip>{data.title}</CardTip>
			</section>

			<section className="mt-[1.2rem]">
				<ContentCard variant="default">
					<ContentCard.Title className="mb-[2rem]">
						{data.subTitle}
					</ContentCard.Title>
					<ContentCard.Content className="whitespace-pre-wrap">
						{data.content}
					</ContentCard.Content>
					<ContentCard.Tags tags={hashtags} />
				</ContentCard>

				<p className="body05-r-12 mt-[1.2rem] pr-[0.8rem] text-right text-gray-700">
					출처: <cite className="not-italic">{data.reference}</cite>
				</p>
			</section>
		</div>
	);
};
