export type {
	HealthTipListElement,
	ReadHealthTipDetailView,
	ReadHealthTipListView,
} from "@/shared/apis/generated/data-contracts";

export interface GetHealthTipListParams {
	page: number;
	hashtagName?: string;
}
